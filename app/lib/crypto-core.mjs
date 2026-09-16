/**
 * Alfabeto italiano a 21 lettere come definito nelle slide ufficiali:
 * a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7, i:8, l:9, m:10, n:11, o:12, p:13, q:14, r:15, s:16, t:17, u:18, v:19, z:20
 */
export const ALPHABET_IT = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "l",
  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "z"
];

/**
 * Cifratura Cesare con Modulo 21 (Slide 10, 12, 14)
 * Formula: (Pos + K) mod 21
 * @param {string} text
 * @param {number} key
 */
export function caesarEncrypt(text, key) {
  const k = ((key % 21) + 21) % 21;
  /** @type {Array<{ char: string; pos: number; calc: string; newPos: number; resChar: string }>} */
  const steps = [];
  const result = text
    .toLowerCase()
    .split("")
    .map((char) => {
      const pos = ALPHABET_IT.indexOf(char);
      if (pos === -1) {
        return char;
      }
      const newPos = (pos + k) % 21;
      const calc = `(${pos} + ${k}) mod 21 = ${newPos}`;
      const resChar = ALPHABET_IT[newPos].toUpperCase();
      steps.push({ char: char.toUpperCase(), pos, calc, newPos, resChar });
      return resChar;
    })
    .join("");

  return { result, steps };
}

/**
 * Decifratura Cesare con Modulo 21 (Slide 11, 13, 14)
 * Formula: (Pos - K) mod 21 (con gestione modulo per numeri negativi: +21)
 * @param {string} text
 * @param {number} key
 */
export function caesarDecrypt(text, key) {
  const k = ((key % 21) + 21) % 21;
  /** @type {Array<{ char: string; pos: number; calc: string; newPos: number; resChar: string }>} */
  const steps = [];
  const result = text
    .toLowerCase()
    .split("")
    .map((char) => {
      const pos = ALPHABET_IT.indexOf(char);
      if (pos === -1) {
        return char;
      }
      let newPos = (pos - k) % 21;
      if (newPos < 0) newPos += 21;
      const calc = `(${pos} - ${k}) mod 21 = ${newPos}`;
      const resChar = ALPHABET_IT[newPos].toUpperCase();
      steps.push({ char: char.toUpperCase(), pos, calc, newPos, resChar });
      return resChar;
    })
    .join("");

  return { result, steps };
}

/**
 * Operazione logica XOR bit a bit (Slide 2 di CRITTOGRAFIA n2)
 * Involuzione: (M ⊕ K) ⊕ K = M
 * @param {string} msg Sequenza binaria di caratteri '0' e '1'
 * @param {string} key Sequenza binaria di caratteri '0' e '1'
 */
export function xorBitwise(msg, key) {
  /** @type {Array<{ mBit: string; kBit: string; resBit: string }>} */
  const steps = [];
  let result = "";
  const maxLen = Math.max(msg.length, key.length);

  for (let i = 0; i < maxLen; i++) {
    const m = msg[i] || "0";
    const k = key[i] || "0";
    const mBit = m === "1" ? 1 : 0;
    const kBit = k === "1" ? 1 : 0;
    const resBit = mBit ^ kBit;
    steps.push({ mBit: m, kBit: k, resBit: String(resBit) });
    result += String(resBit);
  }

  return { result, steps };
}

/**
 * Cifratura Polialfabetica Dinamica ad Autochiave / Evolutiva (Slide 3-7)
 * - Lettera 0: (Pos_0 + K) mod 21
 * - Lettera i: (Pos_i + Pos_in_chiaro_{i-1}) mod 21
 * @param {string} text Testo in chiaro
 * @param {number} initialKey Chiave iniziale K
 */
export function polyalphabeticEncrypt(text, initialKey) {
  const cleanChars = text.toLowerCase().split("");
  /** @type {Array<{ char: string; pos: number; subKey: number; subKeyOrigin: string; sum: number; newPos: number; resChar: string }>} */
  const steps = [];
  let result = "";

  for (let i = 0; i < cleanChars.length; i++) {
    const char = cleanChars[i];
    const pos = ALPHABET_IT.indexOf(char);

    if (pos === -1) {
      result += char;
      continue;
    }

    let subKey = 0;
    let subKeyOrigin = "";

    if (i === 0) {
      subKey = ((initialKey % 21) + 21) % 21;
      subKeyOrigin = `Chiave iniziale K=${subKey}`;
    } else {
      const prevChar = cleanChars[i - 1];
      const prevPos = ALPHABET_IT.indexOf(prevChar);
      subKey = prevPos >= 0 ? prevPos : 0;
      subKeyOrigin = `Posizione '${prevChar.toUpperCase()}' (${subKey})`;
    }

    const sum = pos + subKey;
    const newPos = sum % 21;
    const calc = `(${pos} + ${subKey}) mod 21 = ${newPos}`;
    const resChar = ALPHABET_IT[newPos].toUpperCase();

    steps.push({
      char: char.toUpperCase(),
      pos,
      subKey,
      subKeyOrigin,
      sum,
      newPos,
      resChar
    });

    result += resChar;
  }

  return { result, steps };
}

/**
 * Decifratura Polialfabetica Dinamica (Slide 4, 6, 7)
 * - Lettera 0: (Pos_cifrata_0 - K) mod 21 (+ 21 se negativo)
 * - Lettera i: (Pos_cifrata_i - Pos_in_chiaro_{i-1}) mod 21 (+ 21 se negativo)
 * @param {string} ciphertext Testo cifrato
 * @param {number} initialKey Chiave iniziale K
 */
export function polyalphabeticDecrypt(ciphertext, initialKey) {
  const cipherChars = ciphertext.toLowerCase().split("");
  /** @type {Array<{ char: string; pos: number; subKey: number; subKeyOrigin: string; diff: number; newPos: number; resChar: string }>} */
  const steps = [];
  let result = "";
  /** @type {string[]} */
  const decryptedChars = [];

  for (let i = 0; i < cipherChars.length; i++) {
    const cChar = cipherChars[i];
    const cPos = ALPHABET_IT.indexOf(cChar);

    if (cPos === -1) {
      result += cChar;
      decryptedChars.push(cChar);
      continue;
    }

    let subKey = 0;
    let subKeyOrigin = "";

    if (i === 0) {
      subKey = ((initialKey % 21) + 21) % 21;
      subKeyOrigin = `Chiave iniziale K=${subKey}`;
    } else {
      const prevPlainChar = decryptedChars[i - 1];
      const prevPlainPos = ALPHABET_IT.indexOf(prevPlainChar);
      subKey = prevPlainPos >= 0 ? prevPlainPos : 0;
      subKeyOrigin = `Pos. chiaro prec. '${prevPlainChar.toUpperCase()}' (${subKey})`;
    }

    let diff = (cPos - subKey) % 21;
    if (diff < 0) diff += 21;

    const calc = `(${cPos} - ${subKey}) mod 21 = ${diff}`;
    const resChar = ALPHABET_IT[diff].toUpperCase();

    steps.push({
      char: cChar.toUpperCase(),
      pos: cPos,
      subKey,
      subKeyOrigin,
      diff,
      newPos: diff,
      resChar
    });

    decryptedChars.push(ALPHABET_IT[diff]);
    result += resChar;
  }

  return { result, steps };
}

/**
 * Simulazione Scambio Crittografia Asimmetrica / PKI (Slide 8-9)
 * @param {{
 *   sender: string;
 *   recipient: string;
 *   mode: "confidentiality" | "signature";
 *   message: string;
 * }} params
 */
export function simulateAsymmetricExchange({ sender, recipient, mode, message }) {
  if (mode === "confidentiality") {
    return {
      success: true,
      mode: "confidentiality",
      sender,
      recipient,
      message,
      encryptionKeyUsed: `Chiave Pubblica di ${recipient}`,
      encryptionKeyType: "public",
      decryptionKeyNeeded: `Chiave Privata di ${recipient}`,
      decryptionKeyType: "private",
      explanation: `Solo ${recipient} possiede la propria chiave privata: il messaggio cifrato che viaggia sulla rete insicura è indecifrabile da chiunque altro.`
    };
  }

  return {
    success: true,
    mode: "signature",
    sender,
    recipient,
    message,
    encryptionKeyUsed: `Chiave Privata di ${sender}`,
    encryptionKeyType: "private",
    verificationKeyNeeded: `Chiave Pubblica di ${sender}`,
    verificationKeyType: "public",
    explanation: `Poiché solo ${sender} possiede la propria chiave privata, chiunque decifri/verifichi con la chiave pubblica ha la certezza matematica della provenienza e integrità del documento.`
  };
}
