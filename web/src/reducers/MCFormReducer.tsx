
export interface FormState {
	firstName: string;
	lastName: string;
	email: string;
	error: string;
	isLoading: boolean;
}

export const initialState: FormState = {
	firstName: "",
	lastName: "",
	email: "",
	error: "",
	isLoading: false,
};

type ACTION_TYPE =
	| { type: "INPUT_CHANGE"; field: string; payload: string; }
	| { type: "IS_LOADING"; payload: boolean; }
	| { type: "ERROR"; payload: string; }
	| { type: "SUCCESS"; };

export default function MCFormReducer(state: FormState, action: ACTION_TYPE): FormState {
	switch (action.type) {
		case "INPUT_CHANGE": {
			return {
				...state,
				[action.field]: action.payload
			}
		}
		case "IS_LOADING": {
			return {
				...state,
				isLoading: action.payload,
			};
		}
		case "ERROR": {
			return {
				...state,
				error: action.payload
			};
		}
		case "SUCCESS": {
			return {
				firstName: "",
				lastName: "",
				email: "",
				error: "",
				isLoading: false,
			};
		}
		default:
			throw new Error();
	}
}