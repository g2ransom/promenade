import React from "react";
import {
	Container,
} from "@mui/material";
import WalletButton from "../components/WalletButton";

export default function WalletSandbox() {
	return (
		<Container maxWidth="md" sx={{display: "flex", justifyContent: "center"}}>
			<WalletButton />
		</Container>
	);
}