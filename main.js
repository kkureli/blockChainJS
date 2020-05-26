const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash(); //identifier of this block in chain
    this.nonce = 0;
  }

  calculateHash = () => {
    return SHA256(
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
    this.difficulty = 3;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  //first block in blockchain is called GenesisBlock added manually

  createGenesisBlock() {
    return new Block("22/05/2020", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // addBlock(newBlock) {
  //   // The previous hash value of the new block is the hash value of the last block of the existing blockchain；
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   // Recalculate the hash value of the new block (because the previousHash is specified)；
  //   // newBlock.hash = newBlock.calculateHash();
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);
    console.log("Block successfully mined!");
    this.chain.push(block);

    //bir sonraki miner bu minera odulu akatarabilecek. oyuzden bunun odulu beklemeye atiliyor.
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
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
kaanCoin.createTransaction(new Transaction("address1", "address2", 100));
kaanCoin.createTransaction(new Transaction("address2", "address1", 50));

console.log("Starting the miner..");

kaanCoin.minePendingTransactions("miner1Address");
kaanCoin.minePendingTransactions("miner1Address");

console.log(
  "Balance of miner1 is: " + kaanCoin.getBalanceOfAddress("miner1Address")
);

console.log(kaanCoin.chain);
