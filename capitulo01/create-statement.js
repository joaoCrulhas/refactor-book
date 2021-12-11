const {PerformanceCalculator} = require("./performance-calculator");
const playsDB = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};

const createStatement = (invoice) => {
    const { customer, performances } = invoice;
    const statementData = { customer, performances };
    statementData.performances = statementData.performances.map(addPerformanceInfo);
    statementData.totalAmount = getTotalAmount(statementData);
    statementData.totalVolumeCredits = getTotalVolumeCredits(statementData);
    return statementData;
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

const addPerformanceInfo = performance => {
    const result = Object.assign({}, performance);
    result.play = playFor(performance);
    result.amount = amountFor(result);
    result.volumeCredits = getVolumeCredits(result);
    return result;
}
const amountFor = (aPerformance) => {
    const performanceCalculator = new PerformanceCalculator(aPerformance, aPerformance.play)
    return performanceCalculator.getAmount();
}
const playFor = perf => {
    return playsDB[perf.playID];
}
const getVolumeCredits = aPerformance => {
    const performanceCalculator = new PerformanceCalculator(aPerformance, aPerformance.play)
    return performanceCalculator.getVolumeCredits();
}

module.exports = { createStatement }