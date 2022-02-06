import React from "react";
import { Link } from "react-router-dom";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Typography,
} from "@mui/material";

import SubscribeModal from "./SubscribeModal";
import headlineImage from "../images/byanymeans1080x1080.png";

const styles = {
	boxHeadlineImg: {
		background: "linear-gradient(0deg, lightGray, white)",
		marginBottom: "-1.5em",
	},
	containerHeadlineImg: {
		display: "flex",
		justifyContent: "center",	
	},
	avatar: {
		height: "auto",
		width: "100%",
		maxWidth: "27.5em",
		boxShadow: ".25em .25em .125em grey;",
	},
	subheader: {
		color: "#696969",
	},
	modalBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: "-0.15em",
		ml: 0,
		marginBottom: "3.0em",
	},
	button: {
		boxSizing: "border-box",
		mt: 2,
		width: "100%",
		padding: ".5em 4.5em",
		mr: 1,
	}
}

function HeadlineImg() {
	return (
		<Box sx={styles.boxHeadlineImg}>
			<Container maxWidth="md" sx={styles.containerHeadlineImg}>
				<Avatar
					alt="headline-image"
					src={headlineImage}
					variant="square"
					sx={styles.avatar}
				>
				</Avatar>
			</Container>
		</Box>
	);
}

export default function Headline() {
	return (
		<>
		<Container maxWidth="md">
			<Grid 
				container
				justifyContent="center"
				alignItems="center"
			>
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
				>
					<Typography
						align="center"
						variant="h2"
					>
						The AUC On-Chain
					</Typography>
					<Typography
						align="center"
						variant="h4"
						sx={styles.subheader}
					>
						An NFT art sale that gives 40% of the proceeds to blockchain education
						for the Atlanta University Center Network.  
					</Typography>
						<Grid container sx={styles.modalBox}>
							<Box display="flex" alignItems="center" justifyContent="center">
							<Grid container display="flex" alignItems="center" spacing={2}>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<Button
									variant="bold"
									component={Link}
									size="medium"
									to="/about"
									sx={{...styles.button, mt: 2.0}}
								>
									About Us
								</Button>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6}>
								<SubscribeModal
									buttonSize="medium"
									variant="bold"
									styles={{...styles.button, backgroundColor: "white"}}
								/>
							</Grid>
							</Grid>
							</Box>
						</Grid>
				</Grid>
			</Grid>
		</Container>
		<HeadlineImg />
		</>
	);
}