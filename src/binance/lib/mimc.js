import circomlib from 'circomlib';
import snarkjs from 'snarkjs';

const { bigInt } = snarkjs;

export class MimcSpongeHasher {
  constructor() {
    this.mimcsponge = circomlib.mimcsponge;
  }

  hash(level, left, right) {
    return this.mimcsponge.multiHash([bigInt(left), bigInt(right)]).toString();
  }
}
