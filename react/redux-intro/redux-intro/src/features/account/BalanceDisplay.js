import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useSelector((store) => store.account);
  console.log(balance);
  return <div className="balance">{formatCurrency(balance ? balance : 0)}</div>;
}

export default BalanceDisplay;
