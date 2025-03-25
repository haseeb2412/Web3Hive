// whoele code of transactioncontext before 


import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
const { ethereum } = window;
export const TransactionContext = React.createContext();
import { BrowserProvider, Contract } from "ethers";
import { contractABI, contractAddress } from "../Utils/constant";





const getEthereumContract = async () => {
  if (!window.ethereum) {
    console.error("Ethereum object not found! Please install MetaMask.");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Debug: Check if ABI is loaded
  // console.log("Contract ABI:", contractABI);

  // Ensure ABI is valid before passing it to Contract
  if (!contractABI || contractABI.length === 0) {
    console.error("Invalid contract ABI!");
    return;
  }

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );


  const implementationAddress = await getImplementationAddress(transactionContract.target);
console.log("Implementation Contract Address:", implementationAddress);


  console.log("transaction contract", transactionContract);
  // console.log("Contract Methods:", Object.keys(transactionContract));
  // console.log("Does it have addtoBlockchain?", transactionContract.addtoBlockchain);
  // console.log("Contract Functions:", Object.keys(transactionContract));
  // console.log({ provider, signer, transactionContract });

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
    localStorage.getItem("transactionCount")
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
      if (!ethereum) {
        console.log("Please install Metamask");
        return;
      }

      const transactionContract = getEthereumContract();
      const avalaibleTrnasctions =
        await transactionContract.contractABI.getTransactions();
      console.log("all avalaible Transactions", avalaibleTrnasctions);
    } catch (error) {}
  };

  const checkWalletConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Please install Metamask");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransaction();
      } else {
        console.log("No account found. User is not connected.");
      }
    } catch (error) {
      console.log("Error checking wallet connection:", error);
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      if (!transactionContract) {
        console.error("Transaction contract not found!");
        return;
      }
      // Await the transaction count (Fix #1)
      console.log(transactionContract);
      const transactionCount =
        await transactionContract.contractABI.getTransactionCount();

      // Store it as a string to avoid localStorage issues (Fix #2)
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
      if (!ethereum) return alert("please Install Metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("error in connecting the wallet", error);
    }
  };

  //   const sendTransaction = async () => {
  //     try {
  //       if (!ethereum) return alert("please Install Metamask");
  //       const { addressTo, amount, keyword, message } = formData;
  //       const transactionContract = getEthereumContract();
  //       const parseAmount = ethers.utils.parseEther(amount);
  //       await ethereum.request({
  //         method:"eth_sendTransaction",
  //         params:[{
  //             from:currentAccount,
  //             to:addressTo,
  //             gas:'0x5208', // 21000
  //             value:parseAmount._hex,

  //         }]
  //       });
  //       const transactionHash =await  transactionContract.addtoBlockchain(addressTo, parseAmount, message, keyword);
  //       setIsLoading(true);
  //       console.log("Transaction Hash", transactionHash.hash);
  //       await transactionHash.wait();
  //       setIsLoading(false);
  //       console.log("Success", transactionHash.hash);
  //       const transactionCount = await transactionContract.getTransactionCount();
  //       setTransactionCount(transactionCount.toNumber());

  //     } catch (error) {
  //       console.log("error in sending the transaction", error);
  //     }
  //   };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.parseEther(amount);

      // Send the transaction
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount.toString(16),
          },
        ],
      });

      // Interact with the smart contract
      const transactionHash =
        await transactionContract.contractABI.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword
        );
      setIsLoading(true);
      console.log("Transaction Hash", transactionHash.hash);

      await transactionHash.wait();
      setIsLoading(false);
      console.log("Success", transactionHash.hash);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.error("Error in sending the transaction", error);
    }
  };

  useEffect(() => {
    // checkWalletConnected();
    checkIfTransactionsExist();
    console.log("Updated Account:", currentAccount);
  }, [transactionCount, currentAccount]);

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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
