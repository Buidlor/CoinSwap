import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PageButton from "./components/PageButton";
import ConnectButton from "./components/ConnectButton";
import { GearFill } from "react-bootstrap-icons";
import ConfigModal from "./components/ConfigModal";
import CurrencyField from "./components/CurrencyField";
import { BeatLoader } from "react-spinners";
import {
  getWethContract,
  getUniContract,
  getPrice,
  runSwap,
} from "./AlphaRouterService";

function App() {
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  );

  const [SlippageAmount, setSlippageAmount] = useState<number>(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState<number>(10);

  const [inputAmount, setInputAmount] = useState<number>(0);
  const [outputAmount, setOutputAmount] = useState<number>(0);
  const [transaction, setTransaction] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(0);
  const [wethContract, setWethContract] = useState<any>(undefined);
  const [uniContract, setUniContract] = useState<any>(undefined);
  const [wethAmount, setWethAmount] = useState<number>(0);
  const [uniAmount, setUniAmount] = useState<number>(0);

  useEffect(() => {
    const onload = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const wethContract = getWethContract();
      setWethContract(wethContract);

      const uniContract = getUniContract();
      setUniContract(uniContract);
    };
    onload();
  }, []);

  const getSigner = async (provider: ethers.providers.Web3Provider) => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
    console.log(" signer : ", signer);
  };

  const isConnected = async () => signer !== undefined;

  const getWalletAddress = async () => {
    signer?.getAddress().then((address) => setSignerAddress(address));

    //todo : connect weth and uni contracts
    wethContract.balanceOf(address).then((res) => {
      setWethAmount(Number(ethers.utils.formatEther(res)));
    });
    uniContract.balanceOf(address).then((res) => {
      setUniAmount(Number(ethers.utils.formatEther(res)));
    });
  };

  if (signer !== undefined) {
    getWalletAddress();
  }

  return (
    <div className="App m-5">
      <div className="appNav display grid grid-cols-3 justify-end items-end">
        <div className="tabs tabs-boxed display flex justify-center">
          <PageButton name={"Swap"} isActive={true} />
          <PageButton name={"Pool"} isActive={false} />
          <PageButton name={"Vote"} isActive={false} />
          <PageButton name={"Charts"} isActive={false} />
        </div>

        <div className="rightNav flex justify-center items-center">
          <div className="connectButtonContainer">
            <ConnectButton
              provider={provider}
              isConnected={isConnected}
              signerAddress={signerAddress}
              getSigner={getSigner}
            />
          </div>

          <div className="my-2 buttonContainerClass">
            <PageButton name={"..."} isActive={true} />
          </div>
        </div>
      </div>

      <div className="appBody my-10">
        <div className="swapContainer card card-body w-96 bg-base-100 shadow-xl">
          <div className="swapHeader display flex items-center justify-end gap-10 ">
            <span className="swapText">Swap</span>
            <label
              className="gearContainer cursor-pointer"
              htmlFor="my-modal-4"
            >
              <GearFill className="gearIcon" />
            </label>

            <ConfigModal
              setDeadlineMinutes={setDeadlineMinutes}
              deadlineMinutes={deadlineMinutes}
              setSlippageAmount={setSlippageAmount}
              SlippageAmount={SlippageAmount}
            />
          </div>
          <div className="swapBody">
            <CurrencyField
              field="input"
              tokenName="WETH"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={wethAmount}
            />
            <CurrencyField
              field="output"
              tokenName="UNI"
              value={outputAmount}
              signer={signer}
              balance={uniAmount}
              spinner={BeatLoader}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
