import React, { useState } from "react";
import {
	Button,
	Modal,
} from "@mui/material";
import MailchimpForm from "./MailchimpForm";

const styles = {
	button: {
		mt: 2,
		padding: ".5em 4.5em"
	}
}

export default function SubscribeModal() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button
				size="medium" 
				variant="bold"
				sx={styles.button}
				onClick={handleOpen}>Learn More</Button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<MailchimpForm />
			</Modal>
		</div>
	);
}