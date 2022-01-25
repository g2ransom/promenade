import React from "react";
import {
	Avatar,
	Box,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@mui/material"

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
	link: string;
}

const presaleItems: PresaleGridItemProps[] = [
	{
		title: "Grandma's Garden",
		price: "$40",
		image: grandmasGarden,
		link: "https://buy.stripe.com/14k7sE2T56SabRe144",
	},
	{
		title: "Girl with the Hoop Earring",
		price: "$225",
		image: girlEarring,
		link: "https://buy.stripe.com/dR6cMY2T55O67AY4gh",
	},
	{
		title: "Without Struggle",
		price: "$450",
		image: withoutStruggle,
		link: "https://buy.stripe.com/7sI14g0KX0tMf3q3ce",
	},
	{
		title: "No Fury",
		price: "$900",
		image: noFury,
		link: "https://buy.stripe.com/28o9AMgJVfoG1cA9AD",
	},
	{
		title: "St. Ignis",
		price: "$2,250",
		image: stIgnis,
		link: "https://buy.stripe.com/fZeeV63X990if3q148",
	},
	{
		title: "My Favorite Hue No. 1",
		price: "$4,500",
		image: myFavhue,
		link: "https://buy.stripe.com/14k4gs3X94K2bRe4gl",
	},
	{
		title: "Breakthrough",
		price: "$6,750",
		image: breakthrough,
		link: "https://buy.stripe.com/dR63coctF4K24oMaEK",
	},
	{
		title: "Baptized in Fire",
		price: "$9,000",
		image: baptizedInFire,
		link: "https://buy.stripe.com/9AQ00cdxJ2BUaNadQX",
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

function PresaleGridItem({ title, price, image, link }: PresaleGridItemProps) {
	return (
		<a href={link} style={styles.href}>
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
		</a>
	);
}

export default function PresaleGrid() {
	return (
		<Container maxWidth="md">
			<Typography variant="h5" sx={styles.gridHeader}>
				Presale NFTs
			</Typography>
			<Box display="flex" alignItems="center">
				<Grid container spacing={2} sx={styles.gridContainer}>
					{presaleItems.map((item, i) => (
						<Grid item>
							<PresaleGridItem
								title={item.title}
								price={item.price}
								image={item.image}
								link={item.link}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}