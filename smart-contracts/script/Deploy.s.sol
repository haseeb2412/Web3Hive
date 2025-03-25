// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console2.sol";  
import "../src/Transactions.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast(); 
        Transactions transactionContract = new Transactions();
        vm.stopBroadcast();

        console2.log("Transaction Contract deployed at:", address(transactionContract)); 
    }
}


// pragma solidity ^0.8.20;

// import "forge-std/Script.sol";
// import "../src/Transactions.sol"; // Adjust path if necessary

// contract DeployTransactions is Script {
//     function run() external {
//         vm.startBroadcast(); // Start broadcasting transactions

//         Transactions transactionsContract = new Transactions(); // Deploy contract

//         vm.stopBroadcast(); // Stop broadcasting transactions

//         console.log("Transactions Contract deployed at:", address(transactionsContract));
//     }
// }
