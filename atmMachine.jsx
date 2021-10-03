const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        min="0"
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        disabled={!isValid}
        width="200"
        value="Submit"
        id="submit-input"
      ></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Current Account Balance $ ${totalState}`;
  console.log("account rendered");
  const handleChange = (event) => {
    if (atmMode === "Cash Back" && Number(event.target.value) > totalState) {
      alert(
        `Cash Back Amount $${Number(
          event.target.value
        )} exceeds account availablity.`
      );
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (deposit > totalState && !isDeposit) {
      alert(`Cash Back Amount $${deposit} exceeds account availablity.`);
    } else {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
    }
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    const selected = event.target.value;
    console.log("handleModeSelect atmMode: ", selected);
    setAtmMode(selected);
    if (selected !== "") {
      setIsDeposit(event.target.value === "Deposit" ? true : false);
      setIsVisible(event.target.value != "" ? true : false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <br />
      <h4>What would you like to do?</h4>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>
      <br />
      <br />
      {isVisible && (
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}
        ></ATMDeposit>
      )}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
