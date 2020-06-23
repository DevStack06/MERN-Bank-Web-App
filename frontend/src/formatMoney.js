const formatMoney = (amount) => {
  let formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  let formattedValue = formatter.format(amount);

  return formattedValue;
};

export default formatMoney;
