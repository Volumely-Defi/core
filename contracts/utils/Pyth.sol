// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract Pyth {
  IPyth pyth;

  constructor(address pythContract) {
    pyth = IPyth(pythContract);
  }

}
