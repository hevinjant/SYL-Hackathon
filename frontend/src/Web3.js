import Web3 from "web3";

const NYNTAbi = require("");
const NYNTAddress = "";

export function getBalance() {
  async function _getBalance() {
    if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      const defaultUser = await web3.eth.getAccounts()[0];
      return defaultUser;
    }
    return null;
  }
  return _getBalance();
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
