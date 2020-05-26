const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash(); //identifier of this block in chain
    this.nonce = 0;
  }

  calculateHash = () => {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  };

  mineBlock = (difficulty) => {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      console.log("hash is..", this.nonce, this.hash);

      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  };
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]; //array of blocks
    this.difficulty = 1;
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
    // newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
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

// console.log("Mining block 1..");

// kaanCoin.addBlock(new Block(1, "23/05/2020", { amount: 4 }));
// console.log("Mining block 1..");
kaanCoin.addBlock(new Block(2, "24/05/2020", { amount: 40 }));
