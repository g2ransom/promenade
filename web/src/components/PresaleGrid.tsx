import React from "react";
import {
	Avatar,
	Box,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@mui/material";

import grandmasGarden from "../images/grandmasgarden1080x1080.png";
import girlEarring from "../images/girlwiththehoopearring1080x1080.png";
import withoutStruggle from "../images/withoutstruggle1080x1080.png";
import noFury from "../images/nofury1080x1080.png";
import stIgnis from "../images/stignis1080x1080.png";
import myFavhue from "../images/myfavoritehue1080x1080.png";
import breakthrough from "../images/breakthrough1080x1080.png";
import baptizedInFire from "../images/baptizedinfire1080x1080.png";

interface PresaleGridItemProps {
	title: string;
	price: string;
	image: string;
}

const presaleItems: PresaleGridItemProps[] = [
	{
		title: "Grandma's Garden",
		price: "$10",
		image: grandmasGarden,
	},
	{
		title: "Girl with the Hoop Earring",
		price: "$25",
		image: girlEarring,
	},
	{
		title: "Without Struggle",
		price: "$50",
		image: withoutStruggle,
	},
	{
		title: "No Fury",
		price: "$100",
		image: noFury,
	},
	{
		title: "St. Ignis",
		price: "$250",
		image: stIgnis,
	},
	{
		title: "My Favorite Hue No. 1",
		price: "$500",
		image: myFavhue,
	},
	{
		title: "Breakthrough",
		price: "$2,500",
		image: breakthrough,
	},
	{
		title: "Baptized in Fire",
		price: "$10,000",
		image: baptizedInFire,
	},
];

const styles = {
	href: {
		textDecoration: "none",
	},
	paper: {
		borderRadius: "0.5em",
		height: "15.75em",
		width: "12.45em",
		"&:hover": {
			filter: "brightness(85%)",
		},
	},
	avatar: {
		height: "10em",
		width: "10em",
		maxWidth: "12em",
		borderRadius: "0.5em 0.5em 0 0",
	},
	boxFields: {
		display: "flex",
		mt: 0,
		margin: "0.25em 0.4em 0.3em 0.4em",
		alignItems: "center",
		justifyContent: "space-between",
	},
	fieldNames: {
		fontSize: ".55em",
		color: "#808080",
	},
	boxDetails: {
		display: "flex",
		mt: 0,
		margin: "0.3em 0.4em 0.4em 0.4em",
		alignItems: "center",
		justifyContent: "space-between",
	},
	fieldDetails: {
		fontSize: "0.7em",
		textOverflow: "ellipsis",
	},
	gridContainer: {
		display: "grid",
		gridTemplateColumns: `repeat(auto-fill, 12.45em)`,
		justifyContent: "space-evenly",
		gridGap: "0.5em 1em",
	},
	gridHeader: {
		marginLeft: ".25em",
	},
}

function PresaleGridItem({ title, price, image }: PresaleGridItemProps) {

	return (
			<Paper sx={styles.paper} elevation={10}>
				<Avatar
					alt="image"
					src={image}
					variant="square"
					sx={styles.avatar}
				>
				</Avatar>
				<Box sx={styles.boxFields}>
					<Typography variant="body2" sx={styles.fieldNames}>
						Name
					</Typography>
					<Typography variant="body2" sx={styles.fieldNames}>
						Price
					</Typography>
				</Box>
				<Divider />
				<Box sx={styles.boxDetails}>
					<Typography variant="body2" sx={styles.fieldDetails}>
						{title}
					</Typography>
					<Typography variant="body2" sx={styles.fieldDetails}>
						{price}
					</Typography>
				</Box>
			</Paper>
	);
}

export default function PresaleGrid() {
	return (
		<Container maxWidth="md">
			<Typography variant="h5" sx={styles.gridHeader}>
				NFTs
			</Typography>
			<Box display="flex" alignItems="center">
				<Grid container spacing={2} sx={styles.gridContainer}>
					{presaleItems.map((item, i) => (
						<Grid item key={i}>
							<PresaleGridItem
								title={item.title}
								price={item.price}
								image={item.image}
								key={i}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}