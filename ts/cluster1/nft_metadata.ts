import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      "https://devnet.irys.xyz/AxKmjJv5jW7NwpaU9sJ1uc8qcTLMfbJeTDdJsWSr2q7F";
    const metadata = {
      name: "RugBurn",
      symbol: "RGB",
      description: "Colorful Rug Burns",
      image,
      attributes: [{ trait_type: "sus-ness", value: "high" }],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
    // Your metadata URI:  https://arweave.net/8jeE2841W9Qn32VE5Xkx4DN2SRk3XoRAbkfDZaATPW8b
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

/* 
 https://arweave.net/AxKmjJv5jW7NwpaU9sJ1uc8qcTLMfbJeTDdJsWSr2q7F

*/
