import React, { useState } from "react";
import {
	Avatar,
	Box,
	Container,
	Divider,
	Grid,
	Modal,
	Paper,
	Typography,
} from "@mui/material";

import ReactGA from "react-ga";
import { Wallet } from "./Wallet";

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
	onClick?: () => void;
}

const presaleItems: PresaleGridItemProps[] = [
	{
		title: "Grandma's Garden",
		price: "$40",
		image: grandmasGarden,
	},
	{
		title: "Girl with the Hoop Earring",
		price: "$225",
		image: girlEarring,
	},
	{
		title: "Without Struggle",
		price: "$450",
		image: withoutStruggle,
	},
	{
		title: "No Fury",
		price: "$900",
		image: noFury,
	},
	{
		title: "St. Ignis",
		price: "$2,250",
		image: stIgnis,
	},
	{
		title: "My Favorite Hue No. 1",
		price: "$4,500",
		image: myFavhue,
	},
	{
		title: "Breakthrough",
		price: "$6,750",
		image: breakthrough,
	},
	{
		title: "Baptized in Fire",
		price: "$9,000",
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

function PresaleGridItem({ title, price, image, onClick }: PresaleGridItemProps) {

	return (
			<Paper sx={styles.paper} elevation={10} onClick={onClick}>
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

function PresaleGridItemModal({ title, price, image }: PresaleGridItemProps) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (	
		<Box>	
			<PresaleGridItem
				title={title}
				price={price}
				image={image}
				onClick={handleOpen}
			/>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Box>
					<Paper>
						<Wallet />
					</Paper>
				</Box>
			</Modal>
		</Box>
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
							<PresaleGridItemModal
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