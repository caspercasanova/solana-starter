import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("Dw39XiER88M9NB8HUHm5X5i5chrMSekHBodQehd7Bsmk");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    try {
      keypair;
      console.log(keypair.publicKey);
    } catch (e) {
      throw new Error("Couldnt find key ");
    }

    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mintAuthority: signer,
      mint: mint,
    };

    let data: DataV2Args = {
      name: "NoSol",
      symbol: "NOSOL",
      uri: "https://arwave.net/1234",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: false,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    let result = await tx.sendAndConfirm(umi);
    console.log(bs58.encode(result.signature));
    
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

/* 

result.sig 18eBr9TqjKZ32LCa5p89Jnjb5RjbHGGhMAiVjiyYadoGosBeoNab79TndHbXrHXp9zWSiPsQYNDVGW9rHhnU3Ys

SPL Transfer next

*/
