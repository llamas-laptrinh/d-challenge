import { NextResponse } from "next/server";
import * as multisig from "@sqds/multisig";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { getKeyPair } from "@/utils/getKeyPair";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const { Permission, Permissions } = multisig.types;

  // Create a keypair for the account that will hold the GIF data.

  const creator = getKeyPair();
  // const creator = Keypair.generate();

  // Set our network to devnet.
  const network = "https://api.devnet.solana.com";
  const connection = new Connection(network, "confirmed");

  const secondMember = Keypair.generate();

  const airdropSignature = await connection.requestAirdrop(
    creator.publicKey,
    1 * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(airdropSignature);

  const balance = await connection.getBalance(creator.publicKey);
  console.log(`My balance: ${balance / LAMPORTS_PER_SOL} SOL`);

  const createKey = Keypair.generate();

  const [multisigPda] = multisig.getMultisigPda({
    createKey: createKey.publicKey,
  });

  const signature = await multisig.rpc.multisigCreate({
    connection,
    createKey,
    creator,
    multisigPda,
    configAuthority: null,
    timeLock: 0,
    members: [
      {
        key: creator.publicKey,
        permissions: Permissions.all(),
      },
      {
        key: secondMember.publicKey,
        permissions: Permissions.fromPermissions([Permission.Vote]),
      },
    ],
    threshold: 2,
  });
  console.log("Multisig created: ", signature);
  return NextResponse.json({
    hello: "hello",
  });
}
