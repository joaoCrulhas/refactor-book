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
    switch (aPerformance.play.type) {
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
const playFor = perf => {
    return playsDB[perf.playID];
}

const getVolumeCredits = aPerformance => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if(aPerformance.play.type === 'comedy') {
        result += Math.floor(aPerformance.audience/5)
    }
    return result;
}

const usd = number => {
    const format = new Intl.NumberFormat("en-US", {style: "currency",
        currency: "USD",
        minimumFractionDigits: 2}).format
    return format(number/100);
}

const getTotalVolumeCredits = data => {
    return data.performances.reduce((pv, cv, ci) => {
        return pv + cv.volumeCredits
    }, 0);
}

const getTotalAmount = data => {
    return data.performances.reduce((pv, cv, ci) => {
        return pv + cv.amount
    }, 0);
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
    const { customer, performances } = invoice;
    const statementData = { customer, performances };
    statementData.performances = statementData.performances.map(addPerformanceInfo);
    statementData.totalAmount = getTotalAmount(statementData)
    statementData.totalVolumeCredits = getTotalVolumeCredits(statementData)
    return renderPlainText(statementData);
}

const addPerformanceInfo = performance => {
    const result = Object.assign({}, performance);
    result.play = playFor(performance);
    result.amount = amountFor(result);
    result.volumeCredits = getVolumeCredits(result);
    return result;
}
console.log(statement(invoicesDB[0]));
