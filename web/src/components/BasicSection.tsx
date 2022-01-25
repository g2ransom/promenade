import React from "react";
import { Link } from "react-router-dom";
import {
	Box,
	Button,
	Container,
	Typography,
} from "@mui/material";

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
		marginTop: "-1.5em", 
		marginLeft: "-1em",
		marginBottom: "3.0em",
		ml: 0,
	},
	button: {
		padding: ".5em 4.5em"
	}
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
			<Box sx={styles.modal}>
				<Button
					variant="bold"
					component={Link}
					to="/presale"
					sx={{...styles.button, mt: 4.95}}
				>
					Presale
				</Button>
			</Box>
		</Container>
	);
}