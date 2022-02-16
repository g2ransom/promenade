import * as anchor from "@project-serum/anchor";

export interface AlertState {
	open: boolean;
	message: string;
	severity: string | undefined;
};

interface CandyMachine {
	id: anchor.web3.PublicKey;
	connection: anchor.web3.Connection;
	program: anchor.Program;
}

export interface CandyMachineState {
	candyMachine: CandyMachine;
	balance: number | null;
	isActive: boolean;
	isSoldOut: boolean;
	isMinting: boolean;
	itemsAvailable: number;
	itemsRedeemed: number;
	itemsRemaining: number;
};


export const initialState: CandyMachineState = {
	candyMachine: {} as CandyMachine,
	balance: 0,
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
			default:
				throw new Error();
		}
	};