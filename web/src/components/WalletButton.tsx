import React, { useContext } from "react";
import {
	Box,
	Button,
	Typography,
} from "@mui/material";

import { WalletContext } from "../context/WalletContext";

export default function WalletButton() {
	const { provider, onUpdateProvider } = useContext(WalletContext);
	const { publicKey } = provider;
	console.log("provider: ", provider);

	const onClickConnect = async () => {
		try {
			await provider?.connect();
		} catch(err) {
			console.warn(err);
		}
	}
	
	const onClickDisconnect = async () => {
		try {
			await provider?.disconnect();
		} catch(err) {
			console.warn(err);
		}
	};

	return (
		<>
		{publicKey ? (
			<Box display="flex" alignItems="center">
				<Typography>{publicKey.toBase58()}</Typography>
				<Button
					onClick={onClickDisconnect}
				>
					Disconnect
				</Button>
			</Box>
			) : (
			<Button
				onClick={onClickConnect}
			>
				Connect
			</Button>
			)
		}
		</>
	);
}