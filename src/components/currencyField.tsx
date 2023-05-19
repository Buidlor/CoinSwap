const CurrencyField = (props: any) => {
  const getPrice = async (value: any) => {
    props.getSwapPrice(value);
  };

  return (
    <div className="row currencyInput">
      <div className="col-auto numberContainer">
        {props.loading ? (
          <div className="spinnerContainer">
            <props.spinner />
          </div>
        ) : (
          <input
            className="currencyInputField"
            placeholder="0.0"
            value={props.value}
            onBlur={(e) =>
              props.field === "input" ? getPrice(e.target.value) : null
            }
          />
        )}
      </div>
      <div className="col-auto tokenContainer">
        <span className="tokenName">{props.tokenName}</span>
        <div className="balanceContainer">
          <span className="balanceAmount">
            Balance: {props.balance?.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyField;
