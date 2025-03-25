// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "../src/NewTransactions.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast(); 

        NewTransactions transactionContract = new NewTransactions();
        
        console2.log("Transaction Contract deployed at:", address(transactionContract)); 

        vm.stopBroadcast();
    }
}
