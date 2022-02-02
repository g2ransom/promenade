import React from "react";
import {
	Box,
	Button,
	Typography,
} from "@mui/material";
import { useWallet } from "../hooks/useWallet";

export default function() {
	const provider = useWallet();

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
		{provider && provider.publicKey ? (
			<Box display="flex" alignItems="center">
				<Typography>{provider.publicKey.toBase58()}</Typography>
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