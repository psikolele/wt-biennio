(async function runBsmartExtractor() {
  console.clear();
  console.log('%c[bSmart Extractor v2.0] Avvio procedura...', 'color: #72E3A3; font-weight: bold; font-size: 14px;');

  // 1. Recupero utente e auth_token
  let authToken = '';
  try {
    const userResp = await fetch('https://www.bsmart.it/api/v6/user', { credentials: 'include' });
    if (userResp.ok) {
      const userData = await userResp.json();
      console.log('[bSmart Extractor] Risposta User API:', userData);
      authToken = userData.auth_token || userData.user?.auth_token || '';
      const name = userData.first_name || userData.name || userData.email || userData.user?.email || 'Docente';
      console.log(`%c[bSmart Extractor] Connesso con successo: ${name}`, 'color: #AAA2FF; font-weight: bold;');
    } else {
      console.warn('[bSmart Extractor] User API status:', userResp.status);
    }
  } catch (err) {
    console.warn('[bSmart Extractor] Errore chiamata /api/v6/user:', err);
  }

  // Prepariamo gli header corretti
  const apiHeaders = {};
  if (authToken) {
    apiHeaders['AUTH_TOKEN'] = authToken;
    console.log('[bSmart Extractor] Auth Token agganciato correttamente.');
  }

  // 2. Chiamata ai libri con page_thumb_size=medium obbligatorio
  console.log('[bSmart Extractor] Recupero catalogo libri...');
  const booksUrl = 'https://www.bsmart.it/api/v6/books?page_thumb_size=medium&per_page=25000';
  const booksResp = await fetch(booksUrl, {
    headers: apiHeaders,
    credentials: 'include'
  });

  if (!booksResp.ok) {
    const errorText = await booksResp.text();
    console.error(`[bSmart Extractor] Errore ${booksResp.status} nel recupero libri:`, errorText);
    return;
  }

  const booksPayload = await booksResp.json();
  const allBooks = Array.isArray(booksPayload) ? booksPayload : (booksPayload.books || booksPayload.data || []);
  console.log(`%c[bSmart Extractor] Totale libri attivi nella tua libreria: ${allBooks.length}`, 'color: #72E3A3;');
  allBooks.forEach(b => console.log(`  📚 [ID: ${b.id}] ${b.title}`));

  // 3. Selezione dei volumi di Informatica / Clippy / Coding
  const targetBooks = allBooks.filter(b => {
    const t = (b.title || '').toLowerCase();
    return t.includes('clippy') || t.includes('blocchi') || t.includes('scratch') || t.includes('cloud plus') || t.includes('informatica');
  });

  const selectedBooks = targetBooks.length > 0 ? targetBooks : allBooks;
  console.log(`%c[bSmart Extractor] Libri selezionati per il download (${selectedBooks.length}):`, 'color: #F3B76E; font-weight: bold;');
  selectedBooks.forEach(b => console.log(`  -> ${b.title} (ID: ${b.id})`));

  // Helper per download con Blob o fallback
  const downloadFile = async (url, filename) => {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error('Status ' + r.status);
      const blob = await r.blob();
      const bUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = bUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(bUrl), 15000);
    } catch (e) {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const manifest = [];
  let downloadedCount = 0;

  // 4. Scansione risorse per ciascun libro
  for (const book of selectedBooks) {
    const rev = book.current_edition?.revision || 1;
    console.log(`\n%c--- Elaborazione: ${book.title} ---`, 'color: #AAA2FF; font-weight: bold;');

    // Estrazione dell'Indice (Capitoli/Unità/Pagine)
    try {
      const idxUrl = `https://www.bsmart.it/api/v5/books/${book.id}/${rev}/index`;
      const idxResp = await fetch(idxUrl, { headers: apiHeaders, credentials: 'include' });
      if (idxResp.ok) {
        const indexData = await idxResp.json();
        manifest.push({ type: 'index', bookId: book.id, bookTitle: book.title, data: indexData });
        console.log(`  [OK] Indice e capitoli estratti.`);
      }
    } catch (e) {
      console.warn(`  [!] Impossibile estrarre indice per ${book.id}:`, e);
    }

    // Estrazione delle Risorse (Slide, Esercizi, Laboratori)
    try {
      const resUrl = `https://www.bsmart.it/api/v5/books/${book.id}/${rev}/resources?per_page=500`;
      const resResp = await fetch(resUrl, { headers: apiHeaders, credentials: 'include' });
      if (resResp.ok) {
        const resources = await resResp.json();
        console.log(`  [OK] Trovate ${resources.length} risorse digitali.`);

        for (const res of resources) {
          const resTitle = res.title || res.description || ('resource_' + res.id);
          const assets = res.assets || [];
          for (const asset of assets) {
            if (asset.url) {
              const ext = (asset.url.split('?')[0].split('.').pop() || 'dat').toLowerCase();
              const safePrefix = book.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
              const safeTitle = resTitle.replace(/[^a-zA-Z0-9]/g, '_');
              const filename = `${safePrefix}_${safeTitle}.${ext}`;

              manifest.push({
                bookId: book.id,
                bookTitle: book.title,
                resourceId: res.id,
                resourceTitle: resTitle,
                category: res.category || res.resource_type,
                url: asset.url,
                filename
              });

              if (['pdf', 'pptx', 'ppt', 'xlsx', 'docx', 'sb3', 'fprg', 'zip'].includes(ext)) {
                console.log(`    ⬇ Scarico: ${filename}`);
                await downloadFile(asset.url, filename);
                downloadedCount++;
                await sleep(500); // Pausa per non bloccare il download manager
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn(`  [!] Errore risorse per ${book.id}:`, e);
    }
  }

  // 5. Salvataggio del Manifest JSON
  const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
  const manifestUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = manifestUrl;
  a.download = 'bsmart_resources_manifest.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log(`\n%c=== COMPLETATO! Scaricati ${downloadedCount} file + 'bsmart_resources_manifest.json' ===`, 'color: #72E3A3; font-weight: bold; font-size: 15px;');
  console.log(`I file sono nella tua cartella Downloads. Torna su Antigravity e scrivi 'fatto'!`);
})();
