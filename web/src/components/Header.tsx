import React from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const styles = {
	appBar: {
		marginTop: "-1.5em",
		background: "white",
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	button: {
		textTransform: "none",
		color: "black",
	},
	githubButton: {
		color: "black",
	},
	modalButton: {
		padding: ".1em .25em",
		marginTop: "-2.25em",
		textTransform: "none",
	}
}

export default function Header() {
	return (
		<AppBar position="sticky" elevation={0} sx={styles.appBar}>
			<Toolbar sx={styles.toolbar}>
				<Box>
					<Button
						color="inherit"
						component={Link}
						to="/"
						sx={styles.button}
					>
						Promenade
					</Button>
				</Box>
				<Box sx={{marginBottom: "1.5em"}}>
					<IconButton
						color="inherit"
						href="https://github.com/g2ransom/promenade"
					>
						<GitHubIcon sx={styles.githubButton} />
					</IconButton>
					<Button
						color="inherit"
						component={Link}
						to="/presale"
						sx={styles.button}
					>
						Presale
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}