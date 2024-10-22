import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("Dw39XiER88M9NB8HUHm5X5i5chrMSekHBodQehd7Bsmk");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        // Minting is the Amount minted
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair, token_decimals);
        console.log(`Your mint txid: ${mintTx}`);


        // Create an ATA
        const confirmation = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${confirmation.amount}`);
        
/* 

Your ata is: GU9RQRPAmzznNjryZFjhhcxUna1g1JDJhaUsTbMqZTRo
Your mint txid: 5aQ6H1PB6PWREf8MZAqvASTijRqZcU1g7VA4KkJc1NZapS2V1hZ1i2gk4w5VTz6ZLTE659jhRxHKgXMFYxxTJA4h
Your ata is: GU9RQRPAmzznNjryZFjhhcxUna1g1JDJhaUsTbMqZTRo
mint account keeps track of the total mint amount
*/

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
