import React, { useState } from "react";
import ReactGA from "react-ga";
import {
	Button,
	Modal,
} from "@mui/material";
import MailchimpForm from "./MailchimpForm";

export const styles = {
	button: {
		mt: 2,
		padding: ".5em 4.5em"
	}
}

interface ButtonProps {
	buttonSize: "small" | "medium" | "large" | undefined;
	variant: "text" | "bold" | "outlined" | "contained" | undefined;
	styles: any;
}

export default function SubscribeModal({buttonSize, variant, styles}: ButtonProps) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		ReactGA.modalview("/subscribe");
		setOpen(true);

	};
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button
				size={buttonSize} 
				variant={variant}
				sx={styles}
				onClick={handleOpen}>
					Subscribe
				</Button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<MailchimpForm />
			</Modal>
		</div>
	);
}