const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash(); //identifier of this block in chain
  }

  calculateHash = () => {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  };
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]; //array of blocks
  }

  //first block in blockchain is called GenesisBlock added manually

  createGenesisBlock() {
    return new Block(0, "22/05/2020", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    // The previous hash value of the new block is the hash value of the last block of the existing blockchain；
    newBlock.previousHash = this.getLatestBlock().hash;
    // Recalculate the hash value of the new block (because the previousHash is specified)；
    newBlock.hash = newBlock.calculateHash();

    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let kaanCoin = new Blockchain();
kaanCoin.addBlock(new Block(1, "23/05/2020", { amount: 4 }));
kaanCoin.addBlock(new Block(2, "24/05/2020", { amount: 10 }));

// console.log(JSON.stringify(kaanCoin, null, 4));
console.log("isValid?", kaanCoin.isChainValid());
