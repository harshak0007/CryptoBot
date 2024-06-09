import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import { CONTEXT } from "../context/context";
import {
  Home,
  AddNetwork,
  AddTokenPair,
  Networks,
  Preloader,
  Price,
  Profile,
  Setting,
  TopExchangeTokens,
  TradeTokens,
  Trading,
  SideBar,
  Signup,
  UseTimeout,
  Header,
  Loader,
  Footer,
  Login,
  MovingSubmenu,
  Search,
} from "../components/index";

const index = () => {
  const {
    TRADING_BOT,
    trading,
    topTokens,
    tradingCount,
    length,
    setTradingCount,
    setLoader,
    loader,
  } = useContext(CONTEXT);
  const [activeComponent, setActiveComponent] = useState("Home");
  const [membershipType, setMembershipType] = useState("Premium");
  const [authBackEndId, setAuthBackEndId] = useState("");
  const [networks, setNetworks] = useState({});
  const [networkName, setNetworkName] = useState();

  // NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  useEffect(() => {
    const userBackEndId = localStorage.getItem("CryptoBot_BackEnd");
    const auth = localStorage.getItem("CryptoAUT_TOKEN");
    const network = localStorage.getItem("activeNetwork");

    setNetworks(network);
    setNetworkName(network?.networkName);

    if (auth == null || userBackEndId == null) {
      setActiveComponent("SignUp");
    } else {
      setActiveComponent("Home");
      setAuthBackEndId(userBackEndId);
    }
  }, []);

  const buyMemberShip = async (memberType, price) => {
    notifySuccess("Transaction is procesing...");
    setMembershipType(memberType);
    setLoader(true);

    const provider = new ethers.JsonRpcProvider(
      `https://rpc.ankr.com/polygon_mumbai`
    );
    const wallet = new ethers.Wallet(`0x${networks?.privateKey}`, provider);
    const amountToSend = ethers.parseUnits(price.toString(), "ether");

    const transaction = {
      to: "",
      value: amountToSend,
    };

    // Sign the transaction

    const signedTransaction = await wallet.sendTransaction(transaction);

    const receipt = await signedTransaction.wait();

    console.log(receipt);

    try {
      if (receipt) {
        const response = await axios({
          method: "PATCH",
          url: "/buyMembership",
          withcredentials: true,
          data: {
            membershipType: memberType,
            userId: authBackEndId,
          },
        });

        if (response.statusText == "OK") {
          localStorage.setItem("USER_MEMBERSHIP", memberType);
          notifySuccess("Welcome to pro Membership");
          setLoader(false);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("Transaction Failed");
    }
  };

  return (
    <>
      <div>
        <MovingSubmenu></MovingSubmenu>
        <Preloader></Preloader>
        {activeComponent == "SignUp" ? (
          <Signup
            axios={axios}
            setActiveComponent={setActiveComponent}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          ></Signup>
        ) : (
          <div className="techwave_fn_wrapper">
            <div className="techwave_fn_wrap">
              <Header
                networkName={networkName}
                setActiveComponent={setActiveComponent}
              ></Header>
              <Search></Search>
              <SideBar setActiveComponent={setActiveComponent}></SideBar>

              {activeComponent == "Home" ? (
                <Home></Home>
              ) : activeComponent == "TradeTokens" ? (
                <TradeTokens></TradeTokens>
              ) : activeComponent == "Top Exchange Tokens" ? (
                <TopExchangeTokens></TopExchangeTokens>
              ) : activeComponent == "Networks" ? (
                <Networks
                  networkName={networkName}
                  setNetworkName={setNetworkName}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                ></Networks>
              ) : activeComponent == "Trading" ? (
                <Trading
                  axios={axios}
                  trading={trading}
                  tradingCount={tradingCount}
                  length={length}
                  setTradingCount={setTradingCount}
                  loader={loader}
                  setLoader={setLoader}
                  setActiveComponent={setActiveComponent}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                ></Trading>
              ) : activeComponent == "Pricing" ? (
                <Price
                  buyMemberShip={buyMemberShip}
                  setMembershipType={setMembershipType}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                ></Price>
              ) : activeComponent == "Profile" ? (
                <Profile
                  setActiveComponent={setActiveComponent}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                ></Profile>
              ) : activeComponent == "Setting" ? (
                <Setting
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                  axios={axios}
                ></Setting>
              ) : activeComponent == "Add Token Pair" ? (
                <AddTokenPair></AddTokenPair>
              ) : activeComponent == "Add Networks" ? (
                <AddNetwork axios={axios}></AddNetwork>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {activeComponent == "Login" ? (
          <Login
            setActiveComponent={setActiveComponent}
            axios={axios}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          />
        ) : (
          ""
        )}

        {loader && (
          <div className="new_loader">
            <Loader></Loader>
          </div>
        )}
      </div>
    </>
  );
};

export default index;
