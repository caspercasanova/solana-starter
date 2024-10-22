import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("Dw39XiER88M9NB8HUHm5X5i5chrMSekHBodQehd7Bsmk");

// Recipient address
const to = new PublicKey("94M8gyk7W71AiQzcrHGR5jcLHov3Q4Tk2Ln7EpusDuQC");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromWallet = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );

    // Transfer the new token to the "toTokenAccount" we just created
    // const transactionSig = await mintTo(connection, keypair, mint, toTokenAccount);
    const transactionSig = await transfer(
      connection,
      keypair,
      fromWallet.address,
      toTokenAccount.address,
      keypair,
      1
    );
    console.log("Transaction SIg", transactionSig);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

/* 

45PeXnNVS4Bgt65amkk7TYjzZgvrRt8TXMfzc6unNMgqWgs4yUm9qhbTvqkp4dNSbPowJpRKjMhSiz6bXWU5BeNh

*/
