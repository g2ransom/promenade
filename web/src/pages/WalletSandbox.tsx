import React, { useContext } from "react";
import * as anchor from "@project-serum/anchor";
import {
	Container,
} from "@mui/material";
import WalletButton from "../components/WalletButton";
import CandyMachineInfo from "../components/CandyMachineInfo";
import { WalletContext } from "../context/WalletContext";

const treasury = new anchor.web3.PublicKey(
  process.env.REACT_APP_TREASURY_ADDRESS!
);

const config = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG!
);

const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID!
);

const network = process.env.REACT_APP_SOLANA_NETWORK;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

export default function WalletSandbox() {
	const wallet = useContext(WalletContext);
	return (
		<Container maxWidth="md" sx={{display: "flex", justifyContent: "center"}}>
			<WalletButton />
			{wallet && (
				<CandyMachineInfo
				candyMachineId={candyMachineId}
  			config={config}
			  connection={connection}
			  startDate={startDateSeed}
			  treasury={treasury}
			  txTimeout={txTimeout}
			/>
			)}
		</Container>
	);
}