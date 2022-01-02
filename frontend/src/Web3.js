import Web3 from "web3";

const NYNTAbi = require("./NYNTAbi.json");
const NYNTContractAddress = "0x0F4C21CF12826B32dd0980d2a273FF8fb2688920";
const NYNTStakingABI = require("./NYNTStakingAbi.json");
const NYNTStakingAddress = "0x455793edBa043EF43019720FfB16DCFF5E7F3D57";

export function getBalance() {
  async function _getBalance() {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const defaultUser = (await web3.eth.getAccounts())[0];
      // console.log("USER:", defaultUser);
      // const balance = await web3.eth.getBalance(defaultUser);
      // console.log("ETH BALANCE:", balance / 10 ** 18);
      const NYNTContract = new web3.eth.Contract(NYNTAbi, NYNTContractAddress);
      const NYNTBalance = await NYNTContract.methods
        .balanceOf(defaultUser)
        .call();
      console.log("NYNT Balance:", NYNTBalance);
      return NYNTBalance;
    }
  }
  return _getBalance();
}

export function mint(amount) {
  async function _mint() {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const defaultUser = (await web3.eth.getAccounts())[0];
      // console.log("USER:", defaultUser);
      // const balance = await web3.eth.getBalance(defaultUser);
      // console.log("ETH BALANCE:", balance / 10 ** 18);
      const NYNTContract = new web3.eth.Contract(NYNTAbi, NYNTContractAddress);
      // const NYNTBalance = await NYNTContract.methods
      //   .balanceOf(defaultUser)
      //   .call();
      // console.log("NYNT Balance:", NYNTBalance);
      await NYNTContract.methods
        .mint(defaultUser, 100 / 10 ** 2)
        .send({ from: defaultUser });
    }
  }
  _mint();
}

export function stake(amount) {
  async function _stake() {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const defaultUser = (await web3.eth.getAccounts())[0];
      // console.log("USER:", defaultUser);
      // const balance = await web3.eth.getBalance(defaultUser);
      // console.log("ETH BALANCE:", balance / 10 ** 18);
      const StakingContract = new web3.eth.Contract(
        NYNTStakingABI,
        NYNTStakingAddress
      );
      console.log("StakingContract:", StakingContract);
      await StakingContract.methods
        .addGoal(defaultUser, amount)
        .send({ from: defaultUser });
    }
  }
  _stake();
}
