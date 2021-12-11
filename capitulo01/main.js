const {createStatement} = require('./create-statement');
const invoicesDB = [
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    }
]

const usd = number => {
    const format = new Intl.NumberFormat("en-US", {style: "currency",
        currency: "USD",
        minimumFractionDigits: 2}).format
    return format(number/100);
}
const renderPlainText = statementData => {
    let result = `Statement for invoice ${statementData.customer}\n`;
    for (let perf of statementData.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owned is ${usd(statementData.totalAmount)}\n`;
    result += `You earned ${statementData.totalVolumeCredits} credits \n`;
    return result;
}
const statement = (invoice) => {
    return renderPlainText(createStatement(invoice));
}

console.log(statement(invoicesDB[0]));
