const playsDB = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};
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

const amountFor = (aPerformance) => {
    let result = 0;
    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if(aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;

        case "comedy":
            result = 30000;
            if(aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            break;
        default:
            throw new Error(`Unknown type ${playFor(aPerformance.playID).type}`);
    }
    return result;
}
const playFor = (perf) => {
    return playsDB[perf.playID];

}
const statement = (invoice) => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for invoice ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", {style: "currency",
        currency: "USD",
        minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {
        volumeCredits += Math.max(perf.audience - 30, 0);
        if(playFor(perf).type === 'comedy') {
            volumeCredits += Math.floor(perf.audience/5)
        }
        result += `${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owned is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits \n`;
    return result;
}

console.log(statement(invoicesDB[0]));
