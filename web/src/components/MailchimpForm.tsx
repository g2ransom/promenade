import React from "react";
import { Box } from "@mui/material";
import MailchimpSubscribe, { FormHooks, NameFormFields } from "react-mailchimp-subscribe";
import CustomForm, { formFields } from "./CustomForm";

export default function MailchimpForm() {
	const postUrl = `https://gmail.us20.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`

	return (
		<Box>
			<MailchimpSubscribe
				url={postUrl}
				render={({ subscribe, status, message }: FormHooks<NameFormFields>) => (
					<CustomForm
						status={status}
						message={message}
						onValidated={formData => subscribe(formData)}
            fields={formFields}
					/>
          )}
			/>
		</Box>
	);
}