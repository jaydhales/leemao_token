import { AddressLike, Typed } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const [owners] = await ethers.getSigners();
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

  const getBalancesOF = async (addr: AddressLike | Typed, message: string) => {
    const lmaoBalance = await lmaoContract.balanceOf(addr);
    const wLmaoBalance = await wLmaoContract.balanceOf(addr);

    console.log({
      "": message,
      lmaoBalance,
      wLmaoBalance,
    });
  };

  await getBalancesOF(owners, "")

  await lmaoContract.approve(wLmaoContract, ethers.parseEther("1000000"));
  await wLmaoContract.depositLMAO(ethers.parseEther("100"));

  await getBalancesOF(owners, "")

  await wLmaoContract.withdrawLMAO(ethers.parseEther("10"));

  await getBalancesOF(owners, "")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
