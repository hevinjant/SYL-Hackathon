import Web3 from "web3";

export const NYNTAbi = require("./NYNTAbi.json");
export const NYNTAddress = "0x1fAB77bCDF1C3E9549890494d772A035E4E118c3";

export function getBalance() {
  async function _getBalance() {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const defaultUser = await web3.eth.getAccounts()[0];
      const balance = await web3.eth.getBalance(defaultUser);
      return balance;
    }
    return -1;
  }
  return _getBalance();
}

export function stake() {
  async function _stake() {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const defaultUser = await web3.eth.getAccounts()[0];
      const balance = await web3.eth.getBalance(defaultUser);
      const NYNTContract = new web3.eth.Contract(NYNTAbi, NYNTAddress);
      await NYNTContract.methods
        .stake(defaultUser, balance * 0.05 * 100)
        .send();
      const NYNTBalance = await NYNTContract.methods
        .balanceOf(defaultUser)
        .call();
      return NYNTBalance;
    }
  }
}

export function mint() {
  async function _mint() {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const defaultUser = await web3.eth.getAccounts()[0];
      const balance = await web3.eth.getBalance(defaultUser);
      const NYNTContract = new web3.eth.Contract(NYNTAbi, NYNTAddress);
      await NYNTContract.methods.mint(defaultUser, balance * 0.05 * 100).send();
      const NYNTBalance = await NYNTContract.methods
        .balanceOf(defaultUser)
        .call();
      return NYNTBalance;
    }
  }
  return _mint();
}
