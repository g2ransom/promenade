import React, { useContext, useReducer } from "react";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor"; 
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletContext } from "../context/WalletContext";
import CandyMachineReducer, { initialState } from "../reducers/CandyMachineReducer";
import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "../lib/candyMachine";

export interface CandyMachineProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

export default function CandyMachine() {
  const wallet = useContext(WalletContext);
  const [state, dispatch] = useReducer(CandyMachineReducer, initialState);
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const refreshCandyMachineState = () => {
      (async () => {
        if (!wallet) return;

        const {
          candyMachine,
          goLiveDate,
          itemsAvailable,
          itemsRemaining,
          itemsRedeemed,
        } = await getCandyMachineState(
          wallet as anchor.Wallet,
          props.candyMachineId,
          props.connection
        );

        dispatch({
          type: "REFRESH",
          payload: {
            itemsAvailable: itemsAvailable,
            itemsRemaining: itemsRemaining,
            itemsRedeemed: itemsRedeemed,
            isSoldOut: itemsRemaining === 0,
            startDate: goLiveDate,
            candyMachine: candyMachine,
          }
        })
      })();
    };

  const onMint = async () => {
      try {
        dispatch({
          type: "FIELD_CHANGE",
          field: "isMinting",
          payload: true
        });
        if (wallet && candyMachine?.program) {
          const mintTxId = await mintOneToken(
            candyMachine,
            props.config,
            wallet.publicKey,
            props.treasury
          );

          const status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            props.txTimeout,
            props.connection,
            "singleGossip",
            false
          );

          if (!status?.err) {
            setAlertState({
              open: true,
              message: "Congratulations! Mint succeeded!",
              severity: "success",
            });
          } else {
            setAlertState({
              open: true,
              message: "Mint failed! Please try again!",
              severity: "error",
            });
          }
        }
      } catch (error: any) {
        // TODO: blech:
        let message = error.msg || "Minting failed! Please try again!";
        if (!error.msg) {
          if (error.message.indexOf("0x138")) {
          } else if (error.message.indexOf("0x137")) {
            message = `SOLD OUT!`;
          } else if (error.message.indexOf("0x135")) {
            message = `Insufficient funds to mint. Please fund your wallet.`;
          }
        } else {
          if (error.code === 311) {
            message = `SOLD OUT!`;
            dispatch({
              type: "FIELD_CHANGE",
              field: "isSoldOut",
              payload: true,
            })
          } else if (error.code === 312) {
            message = `Minting period hasn't started yet.`;
          }
        }

        setAlertState({
          open: true,
          message,
          severity: "error",
        });
      } finally {
        if (wallet) {
          const balance = await props.connection.getBalance(wallet.publicKey);
          dispatch({
            type: "FIELD_CHANGE",
            field: "balance",
            payload: balance / LAMPORTS_PER_SOL
          });
        }
        dispatch({
          type: "FIELD_CHANGE",
          field: "isMinting",
          payload: false,
        })
        refreshCandyMachineState();
      }
    };

    useEffect(() => {
      (async () => {
        if (wallet) {
          const balance = await props.connection.getBalance(wallet.publicKey);
          dispatch({
            type: "FIELD_CHANGE",
            field: "balance",
            payload: balance / LAMPORTS_PER_SOL
          });
        }
      })();
    }, [wallet, props.connection]);

    useEffect(refreshCandyMachineState, [
      wallet,
      props.candyMachineId,
      props.connection,
    ]);

    return (
      <div>
        Placeholder
      </div>
    );

};