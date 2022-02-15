import * as anchor from "@project-serum/anchor";

interface AlertState {
	open: boolean;
	message: string;
	severity: string | undefined;
};

export interface CandyMachineState {
	balance: number | null;
	isActive: boolean;
	isSoldOut: boolean;
	isMinting: boolean;
	itemsAvailable: number;
	itemsRedeemed: number;
	itemsRemaining: number;
	alertState: AlertState;
};


export const initialState: CandyMachineState = {
	candyMachine: {
		id: anchor.web3.PublicKey,
		connection: anchor.web3.connection,
		program: anchor.Program,
	},
	balance: null,
	isActive: false,
	isSoldOut: false,
	isMinting: false,
	itemsAvailable: 0,
	itemsRedeemed: 0,
	itemsRemaining: 0,
};

type ACTION_TYPE =
	| { type: "REFRESH"; payload: CandyMachineState; }
	| { type: "FIELD_CHANGE"; field: string; payload: boolean | number | null; }
	| { type: "SUCCESS_ALERT"; payload: AlertState; }
	| { type: "FAILURE_ALERT"; payload: AlertState; }

	export default function CandyMachineReducer(state: CandyMachineState, action: ACTION_TYPE): CandyMachineState {
		switch (action.type) {
			case "REFRESH" : {
				return action.payload;
			}
			case "FIELD_CHANGE": {
				return {
					...state,
					[action.field]: action.payload,
				};
			}
			case "SUCCESS_ALERT": {
				return {
					...state,
					alertState: action.payload,
				};
			}
			case "FAILURE_ALERT": {
				return {
					...state,
					alertState: action.payload,
				};
			}
			default:
				throw new Error();
		}
	};