import React, { useContext } from "react";
import { TransactionContext } from "../context/Transactioncontext";
import dummyData from "../Utils/dummyData";
import { shortAddress } from "../Utils/shortenAddress";
import useGIFFetch from "../hooks/useGIFFetch";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifUrl = useGIFFetch({ keyword });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {shortAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To: {shortAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};


const Transaction = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  // If currentAccount is not set, don't filter transactions
  const userTransactions = currentAccount
    ? transactions.filter(
        (tx) =>
          // tx.addressFrom.toLowerCase() === currentAccount.toLowerCase() ||
          tx.addressTo.toLowerCase() === currentAccount.toLowerCase()
      )
    : [];

  console.log("Filtered Transactions:", userTransactions);
  console.log("Current Account:", currentAccount);
  console.log("All Transactions:", transactions);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Please connect your account
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {userTransactions.length > 0 ? (
            [...userTransactions].reverse().map((transaction, i) => (
              <TransactionCard key={i} {...transaction} />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-4">
              No transactions found for this account.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


export default Transaction;
