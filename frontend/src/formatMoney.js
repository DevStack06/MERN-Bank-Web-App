const formatMoney = (amount) => {
    let formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
    })

    let formattedValue = formatter.format(amount)

    return formattedValue
}

export default formatMoney