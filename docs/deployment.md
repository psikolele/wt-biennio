# Pubblicazione su Vercel

1. Importare il repository Next.js in Vercel.
2. Usare il comando di build predefinito `next build`.
3. Creare la variabile d'ambiente `TEACHER_PASSWORD` con la password condivisa scelta dai docenti.
4. Non inserire la password nel repository e non pubblicare file con dati personali.
5. Verificare `/`, `/anno/1`, `/anno/2`, `/anno/1/settimana/1` e `/docenti/login` dopo il deploy.

L'area docenti usa un cookie httpOnly firmato, senza database. È una protezione leggera coerente con il progetto: la password è condivisa e non vengono salvati account o dati degli studenti.
