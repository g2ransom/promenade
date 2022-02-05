import React from "react";
import {
	Box,
	Container,
	Typography,
} from "@mui/material";

import PresaleGrid from "../components/PresaleGrid";

interface DetailProps {
	prompt: string;
	response: string;
};

const details: DetailProps[] = [
	{
		prompt: "What's up with the name?",
		response: "The Promenade is brick-paved walkway that's a common meeting place and walking path for Morehouse College, Clark Atlanta University and Spelman College students. The name felt like the best way to symbolize everything that unites the Atlanta University Center (AUC)."
	},
	{
		prompt: "Why does this NFT sale exist?",
		response: "This project exists to primarily help fund the education of future builders and contributors in the blockchain ecosytem. We're focusing on the AUC because the creators of the project are both Morehouse College alums and realize the importance of black representation in the space, not only for the economic opportunites, but also for the development of solutions to problems that would unlikely be solved without our insights."
	},
	{
		prompt: "Why does blockchain education matter?",
		response: "Bitcoin was worth $433.44 Jan 1, 2016. Today, it’s worth over $36,000 with a peak of over $67,000 on Nov 7th, 2021. The creators of these platforms, who build cryptocurrencies that grow in value as the community grows, will be in a space to make a lot of money and make a tremendous impact. It's vital that we equip black people with the tools to build tech that has such a high potential upside. Blockchain education matters the same way that learning how to build mobile apps mattered a decade ago."
	},
	{
		prompt: "Where does the money go?",
		response: "50% of the proceeds will go directly towards compensating the creator of the website and the artist. 40% of the proceeds will go towards creating educational resources for people in the AUC network looking to learn about blockchain technology. 10% of the proceeds go directly towards funding AUC schools."
	},
	{
		prompt: "Tell me more about where the money for blockchain education will go.",
		response: "This money will be used to create content, courses, and resources that will be free for the AUC network to consume. Our plan is to develop an E-Book that gives readers all the information they need to use and leverage blockchain technology. We also plan to create an online course that breaks down how to build blockchain-based software for coders that are looking to build Web 3.0 applications. Lastly, we plan to set aside money to directly fund teams that are looking to validate their blockchain app ideas."
	},
	{
		prompt: "What's an NFT, again?",
		response: "An NFT is short for non-fungible token. It's essentially a token that can be used to show the ownership of a unique digital asset that exists on a blockchain network."
	},
	{
		prompt: "Why would I want to own an NFT?",
		response: "NFTs have the same ability to rise in value as cryptocurrencies like Bitcoin and Ethereum. For example, 10,000 CryptoPunk NFTs were given away for free in 2017 and the current largest sale was for $7.58 million in March, 2021. Beyond the potential financial gain, NFTs can be used to digitally represent the things that you care about (like supporting HBCUs) and bring together NFT owners that often have common interests. This is often done by created exclusive memberships for NFT holders, where owners can connect digitally and physically and are also able to receive additional perks based on their ownership. A good example of this is The Bored Ape Yacht Club."
	},
	{
		prompt: "How will these NFTs be created?",
		response: "These 8 NFTs will be created on the Solana Blockchain using an NFT marketplace tool called Metaplex. We chose Solana over Ethereum because of the lower transaction costs. In terms of storing the actual digital art files, these images will be placed on the Arweave network. Arweave is a blockchain network that excels at storing data permanently."
	},
	{
		prompt: "Who are the creators?",
		response: "Robert and Garrett are the creators of this NFT sale. Robert is a 2014 Morehouse alum that works in finance, but creates art part-time. He hosts lots of art events in the NYC area. Garrett is a 2015 Morehouse alum that has mostly worked with tech startups. He started working in the blockchain space in 2017 at a decentralized cloud storage company called Storj. Rob is an Alpha (Alpha Rho) and Garrett is a Kappa (Pi)."
	}
]; 

const styles = {
	container: {
		marginTop: "4em",
		marginBottom: "4em"
	},
	box: {
		marginLeft: ".25em"
	},
	header: {
		marginBottom: "-0.5em",
	},
	boxDetail: {
		boxSizing: "border-box",
		marginBottom: "0.25em",
	},
	detailPrompt: {
		marginBottom: "0.25em",
		color: "#0000D1",
	},
};

function DetailQuestion({ prompt, response }: DetailProps) {
	return (
		<Box sx={styles.boxDetail}>
			<Typography variant="h6" sx={styles.detailPrompt}>
				{prompt}
			</Typography>
			<Typography variant="body1">
				{response}
			</Typography>
		</Box>
	);
}

function NFTSaleDetails() {
	return (
		<Container maxWidth="md" sx={styles.container}>
			<Box sx={styles.box}>
				<Typography variant="h5" sx={styles.header}>
					Details
				</Typography>
				{details.map((detail, i) => (
					<DetailQuestion prompt={detail.prompt} response={detail.response} key={i} />
				))}
			</Box>
		</Container>
	);
}

export default function About() {
	return (
		<>
		<PresaleGrid />
		<NFTSaleDetails />
		</>
	);
}