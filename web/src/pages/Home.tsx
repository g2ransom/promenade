import React from "react";
import {
	Box,
	Container, 
	Typography,
} from "@mui/material";
import Headline from "../components/Headline";
import ImageHeaderContent from "../components/ImageHeaderContent";
import BasicSection, { SectionProps } from "../components/BasicSection";

let sections: SectionProps[] = [
	{
		title: "What buyers get out of this",
		text: "NFT resale opportunities will provide buyers access to potential upside, while \
				supporting a good cause. Also, we plan to build a membership experience \
				for token holders in the future."
	}
];

const styles = {
	box: {
		backgroundColor: "lightgrey",
		padding: "1.5em 0",
	},
	header: {
		marginTop: ".8em",
		marginBottom: ".75em",
		color: "white",
	},
}

function NFTSaleHeader() {
	return (
		<Box sx={styles.box}>
			<Container maxWidth="md">
				<Typography
					align="center"
					variant="h2"
					sx={styles.header}
				>
						9 Art Pieces from Robert Newman (Morehouse ‘14) on the Solana Blockchain. 
				</Typography>
			</Container>
		</Box>
	);
}

export default function Home() {
	return (
			<Box>
				<Headline />
				<NFTSaleHeader />
				<ImageHeaderContent />
				{sections.map((section, i) => {
					return <BasicSection key={i} title={section.title} text={section.text}/>
				})}
			</Box>
	);
}