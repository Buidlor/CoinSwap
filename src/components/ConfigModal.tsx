const ConfigModal = (props: any) => {
  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Transaction settings</h3>

          <div className="row-auto">
            <label className="labelField">Slippage Tolerence</label>
          </div>
          <div className="row-auto flex items-center">
            <div className="fieldContainer col-span-9">
              <input
                type="text"
                className="inputField"
                placeholder="1.0%"
                value={props.SlippageAmount}
                onChange={(e) => props.setSlippageAmount(e.target.value)}
              />
            </div>
            <div className=" col-span-3 inputFieldContainer">
              <span className="mx-2">%</span>
            </div>
          </div>
          <div className="row-auto">
            <label className="labelField">Transaction Deadline</label>
          </div>

          <div className="row-auto flex items-center">
            <div className="fieldContainer col-span-9">
              <input
                type="text"
                className="inputField"
                placeholder="10"
                value={props.deadlineMinutes}
                onChange={(e) => props.setDeadlineMinutes(e.target.value)}
              />
            </div>
            <div className=" col-span-3 inputFieldContainer">
              <span className=" mx-2 ">minutes</span>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ConfigModal;
