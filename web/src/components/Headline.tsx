import React from "react";
import {
	Avatar,
	Box,
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
		marginTop: "-.15em",
		ml: -2,
		marginBottom: "3.0em",
	},
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
					<Box sx={styles.modalBox}>
						<SubscribeModal />
					</Box>

				</Grid>
			</Grid>
		</Container>
		<HeadlineImg />
		</>
	);
}