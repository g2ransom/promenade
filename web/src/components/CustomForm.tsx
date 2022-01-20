import React, { useReducer } from "react";
import {
	Box,
	Container,
	Paper,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import MCFormReducer, { initialState } from "../reducers/MCFormReducer";

interface FormField {
	label: string;
	name: string;
	type: string;
	required: boolean;
}

export const formFields: FormField[] = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    required: true,
   },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
  },
];

export interface FormDataProps {
	EMAIL: string,
	FNAME: string,
	LNAME: string,
}

export interface MCFormProps {
	status: string | null,
	message: string | Error | null,
	onValidated: ({EMAIL, FNAME, LNAME}: FormDataProps) => void,
	fields: typeof formFields,
}

export default function CustomForm({ status, message, onValidated, fields }: MCFormProps) {
	const [state, dispatch] = useReducer(MCFormReducer, initialState);
	console.log(state);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "INPUT_CHANGE",
			field: e.target.name,
			payload: e.target.value,
		})
		console.log(state);
	};

	const validateEmail = (email: string) => {
		const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return email.match(mailformat);
	}

	const validateFields = () => {		
		if (state.firstName === "" || state.lastName === "") {
			if (validateEmail(state.email) == null) {
				dispatch({
					type: "ERROR",
					payload: "Please use a valid email and include your first and last name."
				})
			}
			dispatch({
				type: "ERROR",
				payload: "Please include both your first and last name."
			})
		}
		if (validateEmail(state.email) == null) {
			dispatch({
				type: "ERROR",
				payload: "Please use a valid email."
			})
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		dispatch({
			type: "IS_LOADING",
			payload: true
		});
		e.preventDefault();
		validateFields();
		if (!state.error) {
			onValidated({
				EMAIL: state.email,
				FNAME: state.firstName,
				LNAME: state.lastName,
			});
			if (status === "success") {
				dispatch({type: "SUCCESS"});
			}
		}
		else {
			dispatch({
				type: "IS_LOADING",
				payload: false,
			})
		}
	}

	return (
		<Container maxWidth="xs">
			<Paper elevation={4} sx={{padding: "1.5em"}}>
				<Box sx={{display: "flex", justifyContent: "center"}}>
					<Typography variant="h6" color="grey" align="center" sx={{marginBottom: "-1em"}}>
						Subscribe to get updates from us!
					</Typography>
				</Box>
				<form
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
				>
					<>
						{status === "sending" && <Box color="error.main">sending...</Box>}
						{status === "error" && <Box color="error.main">{message}</Box>}
						{status === "success" && <Box color="error.main">{message}</Box>}
						{formFields.map((field, i) => (
								<TextField
									fullWidth
									key={field.name}
									margin="dense"
									autoFocus={i === 0}
									autoComplete={field.type}
									id={field.name}
									label={field.label}
									name={field.name}
									required={field.required}
									type={field.type}
									variant="filled"
									size="small"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextChange(e)}
								/>
						))}
						{state.error && <Box color="error.main">{state.error}</Box>}
						<Button
							fullWidth
							disabled={state.isLoading}
							type="submit"
							variant="bold"
							sx={{marginTop: "1.5em"}}
						>
							Subscribe
						</Button>
					</>
				</form>
			</Paper>
		</Container>
	);
};