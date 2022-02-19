import React, { useContext, useEffect, useState, useReducer } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import * as anchor from "@project-serum/anchor"; 
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useAnchorWallet from "../hooks/useWallet";
import { WalletContext } from "../context/WalletContext";
import CandyMachineReducer, { CandyMachineState, initialState } from "../reducers/CandyMachineReducer";
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

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

export default function CandyMachineInfo({
  candyMachineId,
  config,
  connection,
  startDate,
  treasury,
  txTimeout,
}: CandyMachineProps) {
  const { provider, onUpdateProvider } = useContext(WalletContext);
  const anchorWallet = useAnchorWallet();
  const [state, dispatch] = useReducer(CandyMachineReducer, initialState);
  const [liveDate, setLiveDate] = useState(new Date());
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const refreshCandyMachineState = () => {
      (async () => {
        if (!anchorWallet) return;

        const {
          candyMachine,
          goLiveDate,
          itemsAvailable,
          itemsRemaining,
          itemsRedeemed,
        } = await getCandyMachineState(
          anchorWallet as anchor.Wallet,
          candyMachineId,
          connection
        );

        setLiveDate(goLiveDate);

        const payload: CandyMachineState = {
            candyMachine: candyMachine,
            itemsAvailable: itemsAvailable,
            itemsRemaining: itemsRemaining,
            itemsRedeemed: itemsRedeemed,
            isSoldOut: itemsRemaining === 0,
            balance: state.balance,
            isActive: state.isActive,
            isMinting: state.isMinting,
        };

        dispatch({
          type: "REFRESH",
          payload: payload,
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
        if (anchorWallet && state.candyMachine?.program) {
          const mintTxId = await mintOneToken(
            state.candyMachine,
            config,
            anchorWallet.publicKey,
            treasury
          );

          const status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            txTimeout,
            connection,
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
        if (anchorWallet) {
          const balance = await connection.getBalance(anchorWallet.publicKey);
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
        if (anchorWallet?.publicKey) {
          const balance = await connection.getBalance(anchorWallet.publicKey);
          dispatch({
            type: "FIELD_CHANGE",
            field: "balance",
            payload: balance / LAMPORTS_PER_SOL
          });
        }
      })();
    }, [anchorWallet, connection]);

    useEffect(refreshCandyMachineState, [
      anchorWallet,
      candyMachineId,
      connection,
    ]);

    return (
      <Box>
        {anchorWallet 
          ? <Typography>Wallet: {anchorWallet.publicKey}</Typography>
          : <Typography>Not Connected to Wallet</Typography>
        }
        {anchorWallet 
          ? <Typography>Balance: {(state.balance || 0).toLocaleString()} SOL</Typography>
          : <Typography>No Balance</Typography>
        }
        {anchorWallet && <Typography>Total Items Available: {state.itemsAvailable}</Typography>}
        {anchorWallet && <Typography>Redeemed: {state.itemsRedeemed}</Typography>}
        {anchorWallet && <Typography>Remaining: {state.itemsRemaining}</Typography>}
      </Box>
    );
};