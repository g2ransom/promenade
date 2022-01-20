import React from "react";
import {
	Avatar,
	Box,
	Container,
	Grid,
	Typography
} from "@mui/material";
import secondImage from "../images/bebop1080x1080.png";

const styles = {
	box: {
		background: "black",
		paddingBottom: "1.5em",
	},
	gridContainer: {
		boxSizing: "border-box",
		paddingTop: "1.5em",
		paddingBottom: "1.5em",
	},
	avatar: {
		height: "auto",
		width: "100%",
		border: `.035em solid lightGrey`
	},
	header: {
		marginBottom: ".25em",
		color: "white",
	},
	subheader: {
		lineHeight: "1.4em",
		letterSpacing: ".0325em",
		wordSpacing: ".025em",
		color: "white",
	},
}

export default function ImageHeaderContent() {
	return (
		<Box sx={styles.box}>
			<Container maxWidth="md">
				<Grid 
					container
					justifyContent="center"
					spacing={5}
					sx={styles.gridContainer}
				>
					<Grid 
						item
						xs={12}
						sm={6}
						md={6}
					>
						<Avatar
							alt="second-image"
							src={secondImage}
							variant="square"
							sx={styles.avatar}
						>
						</Avatar>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={6}
					>
						<Typography 
							align="left"
							variant="h3"
							sx={styles.header}
						>
							The AUC joins the world of decentralization
						</Typography>
						<Typography
							align="left"
							variant="h5"
							sx={styles.subheader}
						>
							The capital raised from this NFT sale will ensure that diverse professionals 
							have access to the resources necessary to add to the blockchain ecosystem and 
							benefit from its growth.
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}