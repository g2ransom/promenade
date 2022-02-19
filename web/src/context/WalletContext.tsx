import { createContext } from "react";
import { PhantomProvider } from "../hooks/useWallet";

export const WalletContext = createContext({
	provider: {} as PhantomProvider,
	onUpdateProvider: (PhantomProvider: any) => {},
});