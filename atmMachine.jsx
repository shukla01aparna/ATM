const ATMDeposit = ({ onChange, isDeposit }) => {
  const choice = ["Deposit", "Cash Back"];
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input
        min="0"
        id="amount"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input type="submit" width="200" value="Submit"></input>
    </label>
  );
};

const Account = () => {
  let amount = 0;
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  let status = `Current Account Balance $ ${totalState}`;
  console.log("account rendered");
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    amount = Number(event.target.value);
  };
  const handleSubmit = () => {
    if (amount > totalState && !isDeposit) {
      alert(`You do not have enough in account to withdraw $${amount}.`);
    } else {
      let newTotal = isDeposit ? totalState + amount : totalState - amount;
      setTotalState(newTotal);
    }
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <br />
      <h4>What would you like to do?</h4>
      <button
        className={isDeposit ? "active" : ""}
        onClick={() => setIsDeposit(true)}
      >
        Deposit
      </button>
      <button
        className={!isDeposit ? "active" : ""}
        onClick={() => setIsDeposit(false)}
      >
        Cash Back
      </button>
      <br />
      <br />
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit}>
        Deposit
      </ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
