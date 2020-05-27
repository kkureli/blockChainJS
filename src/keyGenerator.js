//allows us to generate public and private key
// also memethods to sign something and
//also methods to verify a signature

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

//publicKey profillerin adresi.
//address of wallet

// const key = ec.genKeyPair();
// const publicKey = key.getPublic("hex");
// const privateKey = key.getPrivate("hex");

// console.log("Publickey: ", publicKey);
// console.log("privateKey:", privateKey);

const myKey = ec.keyFromPrivate(
  "21ea294f16f1e9cbb2042dded3835aa9a6da376a9946323a84b2ad7ed88cc9d5"
);

const p = ec.keyFromPublic(
  "21ea294f16f1e9cbb2042dded3835aa9a6da376a9946323a84b2ad7ed88cc9d5",
  "hex"
);
// const myWalletAddress = myKey.getPublic("hex");

// console.log(myKey);
console.log(p);
