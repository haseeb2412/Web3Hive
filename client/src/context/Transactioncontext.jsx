import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
const { ethereum } = window;
export const TransactionContext = React.createContext();
import { BrowserProvider, Contract } from "ethers";
import { contractABI, contractAddress } from "../Utils/constant";

const getEthereumContract = async () => {
  if (!window.ethereum) {
    console.error("Ethereum object not found! Please install MetaMask.");
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  if (!contractABI || contractABI.length === 0) {
    console.error("Invalid contract ABI!");
    return null;
  }

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  // console.log("here is my transactionContract", transactionContract);
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount") || "0"
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getAllTransaction = async () => {
    try {
      const transactionContract = await getEthereumContract();
      if (!transactionContract) {
        console.error("Transaction contract not found!");
        return;
      }

      const availableTransactions = await transactionContract.getTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          // timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          timestamp: new Date(
            Number(transaction.timestamp) * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          // amount: parseInt(transaction.amount._hex) / (10 ** 18)
          amount: Number(transaction.amount) / 10 ** 18,
        })
      );

      console.log("All available transactions:", availableTransactions);
      console.log("structuredTransactions", structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const checkWalletConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Please install MetaMask");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        getAllTransaction();
      } else {
        console.log("No account found. User is not connected.");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await getEthereumContract();
      if (!transactionContract) {
        console.error("Transaction contract not found!");
        return;
      }

      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem(
        "transactionCount",
        transactionCount.toString()
      );
      console.log("Transaction count stored:", transactionCount);
    } catch (error) {
      console.error("Error checking transactions:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      // getAllTransaction();
    } catch (error) {
      console.error("Error in connecting the wallet:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) {
        console.log("Ethereum wallet not found");
        console.log(amount, addressTo, message, keyword);
        return;
      }
      const { amount, addressTo, message, keyword } = formData;
      const transactionContract = await getEthereumContract();

      const parsedAmount = ethers.parseEther(String(amount));
      // console.log("here is my parsed amount", parsedAmount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: "0x" + parsedAmount.toString(16),
          },
        ],
      });

      if (!transactionContract) {
        console.error("Transaction contract is not initialized");
        return;
      }

      const transactionHash = await transactionContract.addtoBlockchain(
        addressTo,
        parsedAmount.toString(),
        message,
        keyword
      );

      console.log("Transaction Hash:", transactionHash);
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionsCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionsCount.toNumber());
    } catch (error) {
      console.error("Error in sending the transaction:", error);
    }
  };


  const handleWalletConnection = () => {
    checkWalletConnected();
    checkIfTransactionsExist();
  };
  

  useEffect(() => {
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setCurrentAccount(savedAccount);
      console.log("Current Account:", savedAccount);
    } 
    // Do NOT call checkWalletConnected() here to prevent MetaMask from opening automatically
  }, []);
  

  // useEffect(() => {
  //   checkWalletConnected();
  //   if (currentAccount) {
  //     checkIfTransactionsExist();
  //     console.log("Updated Account:", currentAccount);
  //   }
  // }, [transactionCount, currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        setCurrentAccount,
        handleWalletConnection,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
