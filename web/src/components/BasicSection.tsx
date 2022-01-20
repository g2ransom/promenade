import React from "react";
import {
	Box,
	Container,
	Typography,
} from "@mui/material";

import SubscribeModal from "./SubscribeModal";

export type SectionProps = {
	title: string,
	text: string,
};

const styles = {
	header: {
		color: "#0000FF",
		marginBottom: ".25em",
	},
	modal: {
		display: "flex",
		justifyContent: "start",
		marginTop: "-.025em", 
		marginLeft: "-1em",
		marginBottom: "3.0em",
		ml: 0,
	},
};

export default function BasicSection({ title, text }: SectionProps) {
	return (
		<Container maxWidth="md">
			<Typography
				variant="h3"
				sx={styles.header}
			>
				{title}
			</Typography>
			<Typography
				variant="h4"
			>
				{text}
			</Typography>
			<Box 
				sx={styles.modal}>
				<SubscribeModal />
			</Box>
		</Container>
	);
}