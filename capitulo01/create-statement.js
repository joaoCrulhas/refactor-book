const {PerformanceCalculator} = require("./performance-calculator");
const {TragedyCalculator} = require("./tragedy-calculator");
const {ComedyCalculator} = require("./comedy-calculator");
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
    const calculator = createPerformanceCalculator(performance, playFor(performance))
    result.play = calculator.aPlay;
    result.amount = calculator.getAmount();
    result.volumeCredits = calculator.getVolumeCredits();
    return result;
}

const playFor = perf => {
    return playsDB[perf.playID];
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
    switch (aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay)
        case "comedy":
            return new ComedyCalculator(aPerformance, aPlay)
        default:
            throw new Error(`Unknown type ${this.aPlay.type}`);
    }
}

module.exports = { createStatement }