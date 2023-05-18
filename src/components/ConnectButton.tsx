const ConnectButton = ({ isConnected, signerAddress, getSigner, provider }) => {
  const displayAddress = () => {
    if (signerAddress !== undefined) {
      const displayAddress =
        signerAddress.slice(0, 6) + "..." + signerAddress.slice(-4);
      return displayAddress;
    } else {
      return "Connect Wallet";
    }
  };
  return (
    <div className="ButtonContainer">
      <button className=" btn btn-primary" onClick={() => getSigner(provider)}>
        {displayAddress()}
      </button>
    </div>
  );
};

export default ConnectButton;
