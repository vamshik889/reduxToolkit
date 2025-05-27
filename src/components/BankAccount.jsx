import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw } from "../slices/accountSlice";

const BankAccount = () => {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.account);
  const [inputState, setInputState] = useState({
    depositAmount: "",
    withdrawAmount: "",
  });
  //edit in main
  const initialErrorState = {
    deposit: false,
    withdraw: false,
  };
  const [error, setError] = useState(initialErrorState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeposit = () => {
    if (inputState.depositAmount <= 0) {
      setError((prev) => ({ ...prev, deposit: true }));
      return;
    }
    dispatch(deposit(inputState.depositAmount));
    setInputState((prev) => ({ ...prev, depositAmount: "" }));
  };
  const handleWithdraw = () => {
    console.log("clicked")
    if (inputState.withdrawAmount > balance || inputState.withdrawAmount<0) {
      setError((prev) => ({ ...prev, withdraw: true }));
      return;
    }
    dispatch(withdraw(inputState.withdrawAmount));
    setInputState((prev) => ({ ...prev, withdrawAmount: "" }));
  };
  useEffect(() => {
    setError(initialErrorState);

  }, [inputState]);

  return (
    <div className="container flex justify-center items-center h-screen content-center gap-4">
      <div className="space-y-4">
        <p className="font-bold text-lg mb-4">Available Balance:{balance}</p>
        <div className="flex gap-4">
          <input
            type="number"
            name="depositAmount"
            value={inputState.depositAmount}
            onChange={handleChange}
            className="border outline-none rounded-sm h-8 border-2"
          />
          <p>{error.deposit && "Amount should be greater than 0"}</p>

          <button
            onClick={handleDeposit}
            disabled={inputState.depositAmount === ""}
            className="min-w-[100px] hover:bg-green-400 bg-green-300 rounded-sm cursor-pointer"
          >
            Deposit
          </button>
        </div>

        <div className="flex gap-8">
          <input
            type="number"
            name="withdrawAmount"
            value={inputState.withdrawAmount}
            onChange={handleChange}
            className="border outline-none rounded-sm h-8 border-2"
          />
          <button
            onClick={handleWithdraw}
             disabled={inputState.withdrawAmount === ""}
            className="min-w-[100px] hover:bg-red-400 bg-red-300 rounded-sm cursor-pointer"
          >
            Withdraw
          </button>
          
          <p>
            {error.withdraw &&
              `Enter the amount between 1 to ${balance} rupees`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
