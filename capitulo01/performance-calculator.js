
class PerformanceCalculator {

    constructor(aPerformance, aPlay) {
        this.aPerformance = aPerformance;
        this.aPlay = aPlay;
    }
    getVolumeCredits() {
        return Math.max(this.aPerformance.audience - 30, 0);
    }
    getAmount() {
        throw new Error(`Implemented in subclasses`);
    }

}

module.exports = { PerformanceCalculator };