import { ethers } from "hardhat";

async function main() {
  const lmaoContract = await ethers.deployContract("LMAO");
  await lmaoContract.waitForDeployment();
  const wLmaoContract = await ethers.deployContract("WrappedLMAO", [
    lmaoContract.target,
  ]);

  await wLmaoContract.waitForDeployment();

  console.log({
    "": "Deployed Contract",
    LMAO: lmaoContract.target,
    WLMAO: wLmaoContract.target,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
