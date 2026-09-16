import assert from "node:assert/strict";
import { test } from "node:test";
import {
  ALPHABET_IT,
  caesarEncrypt,
  caesarDecrypt,
  xorBitwise,
  polyalphabeticEncrypt,
  polyalphabeticDecrypt,
  simulateAsymmetricExchange
} from "../app/lib/crypto-core.mjs";

test("Alfabeto italiano ufficiale delle slide contiene 21 lettere", () => {
  assert.equal(ALPHABET_IT.length, 21);
  assert.equal(ALPHABET_IT[0], "a");
  assert.equal(ALPHABET_IT[20], "z");
  assert.equal(ALPHABET_IT.includes("j"), false);
  assert.equal(ALPHABET_IT.includes("k"), false);
  assert.equal(ALPHABET_IT.includes("w"), false);
  assert.equal(ALPHABET_IT.includes("x"), false);
  assert.equal(ALPHABET_IT.includes("y"), false);
});

test("Cesare Modulo 21: Cifratura e Decifratura degli esercizi ufficiali delle slide", () => {
  // Slide 10: "CADO" con K=4 -> "GEHS"
  const cadoEnc = caesarEncrypt("CADO", 4);
  assert.equal(cadoEnc.result, "GEHS");
  const cadoDec = caesarDecrypt("GEHS", 4);
  assert.equal(cadoDec.result, "CADO");

  // Slide 13: Decifra "DEG" con K=6 (gestione modulo negativo) -> "UVA"
  const degDec = caesarDecrypt("DEG", 6);
  assert.equal(degDec.result, "UVA");
  // Verifica passaggi: D(3) - 6 = -3 -> 18 (U), E(4) - 6 = -2 -> 19 (V), G(6) - 6 = 0 -> 0 (A)
  assert.equal(degDec.steps[0].newPos, 18);
  assert.equal(degDec.steps[0].resChar, "U");

  // Slide 14: Cifra e decifra "CLASSE" con K=10 -> "OVMFFQ"
  const classeEnc = caesarEncrypt("CLASSE", 10);
  assert.equal(classeEnc.result, "OVMFFQ");
  const classeDec = caesarDecrypt("OVMFFQ", 10);
  assert.equal(classeDec.result, "CLASSE");

  // Slide 14: Cifra e decifra "ANNA" con K=12 -> "OCCO"
  const annaEnc = caesarEncrypt("ANNA", 12);
  assert.equal(annaEnc.result, "OCCO");
  const annaDec = caesarDecrypt("OCCO", 12);
  assert.equal(annaDec.result, "ANNA");
});

test("Metodo XOR Bit a Bit: involuzione e test vettori ufficiali (Slide 2)", () => {
  const msg = "1011101";
  const key = "0101011";

  // Cifratura
  const enc = xorBitwise(msg, key);
  assert.equal(enc.result, "1110110");

  // Decifratura con la stessa chiave
  const dec = xorBitwise(enc.result, key);
  assert.equal(dec.result, msg);

  // Proprietà involutiva (M ⊕ K) ⊕ K = M
  const customMsg = "11001001";
  const customKey = "10101010";
  const roundtrip = xorBitwise(xorBitwise(customMsg, customKey).result, customKey).result;
  assert.equal(roundtrip, customMsg);
});

test("Crittografia Polialfabetica Dinamica: Slide 3-7 (ALLA, MIA, SCUOLA)", () => {
  // Slide 3-4: "ALLA" con chiave iniziale K=20 -> "ZLUL"
  const allaEnc = polyalphabeticEncrypt("ALLA", 20);
  assert.equal(allaEnc.result, "ZLUL");
  const allaDec = polyalphabeticDecrypt("ZLUL", 20);
  assert.equal(allaDec.result, "ALLA");

  // Slide 6: "MIA" con chiave iniziale K=3 -> "PUI"
  const miaEnc = polyalphabeticEncrypt("MIA", 3);
  assert.equal(miaEnc.result, "PUI");
  const miaDec = polyalphabeticDecrypt("PUI", 3);
  assert.equal(miaDec.result, "MIA");

  // Slide 7: "SCUOLA" con chiave iniziale K=4 -> "ZUZLAL"
  const scuolaEnc = polyalphabeticEncrypt("SCUOLA", 4);
  assert.equal(scuolaEnc.result, "ZUZLAL");
  const scuolaDec = polyalphabeticDecrypt("ZUZLAL", 4);
  assert.equal(scuolaDec.result, "SCUOLA");
});

test("Simulazione Crittografia Asimmetrica (PKI): Riservatezza vs Firma Digitale (Slide 8-9)", () => {
  // Scenario 1: Riservatezza (Mittente Alice -> Destinatario Bob)
  const confidentiality = simulateAsymmetricExchange({
    sender: "Alice",
    recipient: "Bob",
    mode: "confidentiality",
    message: "DATI RISERVATI"
  });
  assert.equal(confidentiality.encryptionKeyUsed, "Chiave Pubblica di Bob");
  assert.equal(confidentiality.decryptionKeyNeeded, "Chiave Privata di Bob");
  assert.equal(confidentiality.success, true);

  // Scenario 2: Firma Digitale (Mittente Alice firma per Bob)
  const signature = simulateAsymmetricExchange({
    sender: "Alice",
    recipient: "Bob",
    mode: "signature",
    message: "DOCUMENTO UFFICIALE"
  });
  assert.equal(signature.encryptionKeyUsed, "Chiave Privata di Alice");
  assert.equal(signature.verificationKeyNeeded, "Chiave Pubblica di Alice");
  assert.equal(signature.success, true);
});
