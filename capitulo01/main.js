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

const getVolumeCredits = aPerformance => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if(playFor(aPerformance).type === 'comedy') {
        result += Math.floor(aPerformance.audience/5)
    }
    return result;
}

const usd = (number) => {
    const format = new Intl.NumberFormat("en-US", {style: "currency",
        currency: "USD",
        minimumFractionDigits: 2}).format
    return format(number/100);
}

const statement = (invoice) => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for invoice ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        volumeCredits = getVolumeCredits(perf)
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owned is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits \n`;
    return result;
}

console.log(statement(invoicesDB[0]));
