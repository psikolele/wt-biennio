import {
  ALPHABET_IT,
  caesarEncrypt,
  caesarDecrypt,
  xorBitwise,
  polyalphabeticEncrypt,
  polyalphabeticDecrypt,
  simulateAsymmetricExchange
} from "./crypto-core.mjs";

export {
  ALPHABET_IT,
  caesarEncrypt,
  caesarDecrypt,
  xorBitwise,
  polyalphabeticEncrypt,
  polyalphabeticDecrypt,
  simulateAsymmetricExchange
};

export type CaesarStep = {
  char: string;
  pos: number;
  calc: string;
  newPos: number;
  resChar: string;
};

export type XorStep = {
  mBit: string;
  kBit: string;
  resBit: string;
};

export type PolyStep = {
  char: string;
  pos: number;
  subKey: number;
  subKeyOrigin: string;
  sum?: number;
  diff?: number;
  newPos: number;
  resChar: string;
};
