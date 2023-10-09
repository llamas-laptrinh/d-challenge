import {
  AnchorProvider,
  Program,
  Wallet,
  setProvider,
  web3,
  workspace,
} from "@project-serum/anchor";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { getKeyPair } from "./getKeyPair";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

const programID = new PublicKey("BunKrGBXdGxyTLjvE44eQXDuKY7TyHZfPu9bj2Ugk5j2");
const kp = getKeyPair();

const network = clusterApiUrl("devnet");
const wallet = new Wallet(kp);
const opts: any = {
  preflightCommitment: "processed",
};

export const initBunkr = async () => {
  const program: any = getProgram();
  const initBunkrData: any = {
    name: "Test Bunkr",
    // initTime: initTime,
    // root: [...root],
    // initialHash: [...passwordHash],
    // finalHash: [...finalPasswordHash],
    // initialResetHash: [...resetHash],
    // finalResetHash: [...finalResetHash],
    shadowDriveSpace: "BpkFF4TDHUpyX8wana3a9NUd6xZXoC4RN1c4nv1PtaDm",
  };

  const bunkrAccount = findProgramAddressSync(
    [Buffer.from("bunkr"), wallet.payer.publicKey.toBuffer()],
    programID
  )[0];
  const tx = await program.rpc.initBunkr({});

  
};

export const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );
  return provider;
};

export const getProgram = async () => {
  // Get metadata about your solana program

  const idl = await Program.fetchIdl(programID, getProvider());

  // Create a program that you can call
  if (idl) {
    return new Program(idl, programID, getProvider());
  }
  return null;
};
