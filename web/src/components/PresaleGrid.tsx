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

import ReactGA from "react-ga";

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
		price: "$10",
		image: grandmasGarden,
		link: "https://buy.stripe.com/4gw3coeBN4K2cVifZ6",
	},
	{
		title: "Girl with the Hoop Earring",
		price: "$25",
		image: girlEarring,
		link: "https://buy.stripe.com/cN2dR23X90tMcViaEN",
	},
	{
		title: "Without Struggle",
		price: "$50",
		image: withoutStruggle,
		link: "https://buy.stripe.com/6oEdR2gJVdgy8F27sC",
	},
	{
		title: "No Fury",
		price: "$100",
		image: noFury,
		link: "https://buy.stripe.com/bIY7sEbpB7WecVieV5",
	},
	{
		title: "St. Ignis",
		price: "$250",
		image: stIgnis,
		link: "https://buy.stripe.com/6oE6oAbpBdgy1cA4gs",
	},
	{
		title: "My Favorite Hue No. 1",
		price: "$500",
		image: myFavhue,
		link: "https://buy.stripe.com/3cs14gfFRdgyaNa4gt",
	},
	{
		title: "Breakthrough",
		price: "$2,500",
		image: breakthrough,
		link: "https://buy.stripe.com/fZecMYfFRgsKcVi5ky",
	},
	{
		title: "Baptized in Fire",
		price: "$10,000",
		image: baptizedInFire,
		link: "https://buy.stripe.com/14k3coctFa4m08wcN1",
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
	const handleClick = () => {
		ReactGA.outboundLink({ label: link }, function() {console.log("redirect here")})
	}

	return (
		<a href={link} style={styles.href} onClick={handleClick}>
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
						<Grid item key={i}>
							<PresaleGridItem
								title={item.title}
								price={item.price}
								image={item.image}
								link={item.link}
								key={i}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}