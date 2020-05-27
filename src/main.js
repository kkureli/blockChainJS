const { Blockchain, Transaction } = require("./blockChain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "21ea294f16f1e9cbb2042dded3835aa9a6da376a9946323a84b2ad7ed88cc9d5"
);
const myWalletAddress = myKey.getPublic("hex");

let kaanCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);

tx1.signTransaction(myKey);
kaanCoin.addTransaction(tx1);

console.log("Starting the mining..");

kaanCoin.minePendingTransactions(myWalletAddress);

console.log(
  "Balance of miner1 is: " + kaanCoin.getBalanceOfAddress(myWalletAddress)
);

console.log(kaanCoin.chain);
