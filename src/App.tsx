import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PageButton from "./components/PageButton";

function App() {
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const onload = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    };
    onload();
  }, []);

  const getSigner = async (provider: ethers.providers.Web3Provider) => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  };

  const isConnected = async () => {
    signer !== undefined && console.log(await signer.getAddress());
  };

  const getWalletAddress = async () => {
    signer?.getAddress().then(
      (address) => setSignerAddress(address)
      //todo : connect weth and uni contracts
    );
    if (signer !== undefined) {
      getWalletAddress();
    }
  };

  return (
    <div className="App m-5">
      <div className="appNav display flex justify-center">
        <div className="tabs tabs-boxed display flex justify-center">
          <PageButton name={"Swap"} isActive={true} />
          <PageButton name={"Pool"} isActive={false} />
          <PageButton name={"Vote"} isActive={false} />
          <PageButton name={"Charts"} isActive={false} />
        </div>
      </div>
      <div className="rightNav">
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
  );
}

export default App;
