import kp from "@/helpers/keypair.json";
import { web3 } from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";

export const getKeyPair = () => {
  const arr = Object.values(kp._keypair.secretKey);
  const secret = new Uint8Array(arr);

  const creator = Keypair.fromSecretKey(secret);
  return creator;
};
