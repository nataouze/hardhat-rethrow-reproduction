const { ethers } = require("hardhat");

it("rethrow error from delegatecall at function call", async function () {
  const CustomErrorContract = await ethers.getContractFactory("CustomErrorContract");
  const customErrorContract = await CustomErrorContract.deploy();

  const RethrowAtFunctionCall = await ethers.getContractFactory("RethrowAtFunctionCall");
  const rethrowAtFunctionCall = await RethrowAtFunctionCall.deploy();

  await rethrowAtFunctionCall.test(customErrorContract.address, customErrorContract.interface.encodeFunctionData("a", []));
});

it("rethrow error from delegatecall at construction", async function () {
  const CustomErrorContract = await ethers.getContractFactory("CustomErrorContract");
  const customErrorContract = await CustomErrorContract.deploy();

  const RethrowAtConstruction = await ethers.getContractFactory("RethrowAtConstruction");
  await RethrowAtConstruction.deploy(customErrorContract.address, customErrorContract.interface.encodeFunctionData("a", []));
});
