// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Transactions{
    uint256 private transactionCount;

    event Transfer(
        address indexed from,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }


    TransferStruct[] public transactions;

    function addtoBlockchain( address payable receiver,uint256 amount,string memory message ,string memory keyword) public {
        unchecked {
            transactionCount += 1; 
        }
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));
        emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }
    function getTransactions() public view returns(TransferStruct[] memory){
        return transactions;
    }
    function getTransactionCount() public view returns(uint256){
        return transactionCount;
    }
    receive() external payable{}

    fallback() external payable{}

}


// pragma solidity ^0.8.20;

// contract Transactions {
//     uint256 private transactionCount;

//     event Transfer(
//         address indexed from,
//         address indexed receiver,
//         uint256 amount,
//         string message,
//         uint256 timestamp,
//         string keyword
//     );

//     struct TransferStruct {
//         address sender;
//         address receiver;
//         uint256 amount;
//         string message;
//         uint256 timestamp;
//         string keyword;
//     }

//     TransferStruct[] private transactions;

//     function addToBlockchain(
//         address payable receiver,
//         uint256 amount,
//         string memory message,
//         string memory keyword
//     ) public {
//         unchecked {
//             transactionCount += 1; // Saves gas by skipping overflow check
//         }

//         transactions.push(TransferStruct(
//             msg.sender, receiver, amount, message, block.timestamp, keyword
//         ));

//         emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
//     }

//     function getAllTransactions() public view returns (TransferStruct[] memory) {
//         return transactions;
//     }

//     function getTransactionCount() public view returns (uint256) {
//         return transactionCount;
//     }

//     receive() external payable {} // Allows contract to receive ETH

//     fallback() external payable {} // Handles unexpected function calls
// }


