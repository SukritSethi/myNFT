import React, { useState } from "react";
import Header from "./components/Header";
// var Web3 = require('web3');
import "./App.scss";
import metamasklogo from "./assets/MetamaskLogo.png";
import MyNFTs from "./components/MyNFTs/MyNFTs";
import MyHolding from "./components/MyHolding/MyHolding";

const App = () => {
  const [clientAddress, setClientAddress] = useState(null);

  async function getAddress() {
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(account);
    setClientAddress(accounts);
    window.ethereum.on("accountsChanged", function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log("clientAddress");
      console.log(clientAddress);
      console.log(accounts[0]);
      setClientAddress(accounts[0]);
    });
  }

  const handleClick = () => {
    console.log("click registered");
  };

  return (
    <div>
      {/* <img src="https://i.seadn.io/gae/xC56jc71bNZxXIEvPVYM4hRCOCLqFUZnKpSphvipYO5hEh-U3HKS_Z23LzQLvJa0rrdK7Or0qXYKTUFCloyF5aIuZxyE3aOlHlzK?w=500&auto=format" alt="" /> */}
      <Header />
      <div className="address">
        <div className="address__input__style">
          <div className="hover__input">
            <input
              type="text"
              className="address__input"
              placeholder="enter your address"
              value={clientAddress}
              onChange={(e) => {
                setClientAddress(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="address__or">OR</div>
        <div className="address__metamask">
          <div className="address__style" onClick={getAddress}>
            <img
              src={metamasklogo}
              alt="metamask logo"
              className="metamasklogo"
            />
            <p> connect metamask</p>
          </div>
        </div>
      </div>
      <div className="main__container">
        {/* <div className="main__gabagucci"> */}
        
          <MyHolding address={clientAddress} className="" />
        {/* </div> */}
        {/* <div className="main__gabagucci">
        <MyNFTs className="main_gabagucci" /></div> */}
      </div>
    </div>
  );
};

export default App;
