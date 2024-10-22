import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  let tx = await createNft(umi, {
    mint,
    sellerFeeBasisPoints: percentAmount(0),
    name: "RugBurn",
    uri: "https://devnet.irys.xyz/C9Sr1Qt4SxkEVPb6K6gxcEq9DHRBD2yTzECYcDapNV7W",
    symbol: "RGB",
  });
  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature);

  console.log(
    `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );

  console.log("Mint Address: ", mint.publicKey);
})();

/* 

https://arweave.net/C9Sr1Qt4SxkEVPb6K6gxcEq9DHRBD2yTzECYcDapNV7W


https://explorer.solana.com/tx/4QwrwXQUVoCWBu8x29P99mMVsbiabsbMVtYS2GF5FVbc1t7G8N8ZE1uXPT3qLwbrCCwjUgBCTuCkxZaAdLvpCHQF?cluster=devnet
Mint Address:  3g4T8NPJgKKKPJ1XgWUBcZRWEBkxcrTj2cumuJR1vmxL

*/
