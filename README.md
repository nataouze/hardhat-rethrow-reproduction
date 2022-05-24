#

Rethrowing custom error from a `delegatecall` in a function or in a constructor.

```
OK (custom error retrieved)
  1) rethrow error from delegatecall at function call:
     Error: VM Exception while processing transaction: reverted with custom error 'MyCustomErrror()'
    at CustomErrorContract.a (contracts/CustomErrorContract.sol:8)
    at RethrowAtFunctionCall.test (contracts/RethrowAtFunctionCall.sol:6)
    at HardhatNode._mineBlockWithPendingTxs (node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1773:23)
    at HardhatNode.mineBlock (node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:466:16)
    at EthModule._sendTransactionAndReturnHash (node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:1504:18)
    at HardhatNetworkProvider.request (node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:118:18)
    at EthersProviderWrapper.send (node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)

NOT GOOD (unrecognized custom error)
  2) rethrow error from delegatecall at construction:
     Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="VM Exception while processing transaction: reverted with an unrecognized custom error", method="estimateGas", transaction={"from":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","data":"0x608060405234801561001057600080fd5b5060405161039838038061039883398181016040528101906100329190610291565b6000808373ffffffffffffffffffffffffffffffffffffffff168360405161005a9190610334565b600060405180830381855af49150503d8060008114610095576040519150601f19603f3d011682016040523d82523d6000602084013e61009a565b606091505b5091509150816100ac57805181602001fd5b5050505061034b565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100f4826100c9565b9050919050565b610104816100e9565b811461010f57600080fd5b50565b600081519050610121816100fb565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61017a82610131565b810181811067ffffffffffffffff8211171561019957610198610142565b5b80604052505050565b60006101ac6100b5565b90506101b88282610171565b919050565b600067ffffffffffffffff8211156101d8576101d7610142565b5b6101e182610131565b9050602081019050919050565b60005b8381101561020c5780820151818401526020810190506101f1565b8381111561021b576000848401525b50505050565b600061023461022f846101bd565b6101a2565b9050828152602081018484840111156102505761024f61012c565b5b61025b8482856101ee565b509392505050565b600082601f83011261027857610277610127565b5b8151610288848260208601610221565b91505092915050565b600080604083850312156102a8576102a76100bf565b5b60006102b685828601610112565b925050602083015167ffffffffffffffff8111156102d7576102d66100c4565b5b6102e385828601610263565b9150509250929050565b600081519050919050565b600081905092915050565b600061030e826102ed565b61031881856102f8565b93506103288185602086016101ee565b80840191505092915050565b60006103408284610303565b915081905092915050565b603f806103596000396000f3fe6080604052600080fdfea26469706673582212204e728f862565e731f8737313ac0debd0b7011a81bb878cf6ee7613c61923442864736f6c634300080e0033000000000000000000000000cf7ed3acca5a467e9e704c703e8d87f634fb0fc9000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000040dbe671f00000000000000000000000000000000000000000000000000000000","accessList":null}, error={"stackTrace":[{"type":6,"sourceReference":{"function":"constructor","contract":"RethrowAtConstruction","sourceName":"contracts/RethrowAtConstruction.sol","sourceContent":"// SPDX-License-Identifier: Unlicense\npragma solidity ^0.8.0;\n\ncontract RethrowAtConstruction {\n    constructor(address target, bytes memory data) {\n        (bool success, bytes memory returndata) = target.delegatecall(data);\n        if (!success) {\n            assembly {\n                revert(add(32, returndata), mload(returndata))\n            }\n        }\n    }\n}\n","line":9,"range":[289,335]},"message":"reverted with an unrecognized custom error"}],"data":"0x158b4da0"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.6.7)
      at Logger.makeError (node_modules/@ethersproject/logger/src.ts/index.ts:261:28)
      at Logger.throwError (node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
      at checkError (node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:78:20)
      at EthersProviderWrapper.<anonymous> (node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:603:20)
      at step (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:48:23)
      at Object.throw (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:29:53)
      at rejected (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:21:65)

```
