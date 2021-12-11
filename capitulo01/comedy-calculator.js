const {PerformanceCalculator} = require("./performance-calculator");

class ComedyCalculator extends PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        super(aPerformance, aPlay);
        this.startAmount = 30000;
        this.aPerformance = aPerformance;
        this.aPlay = aPlay;
    }
    getAmount() {
        return (this.aPerformance.audience > 20)
            ? this.startAmount + 10000 + 500 * (this.aPerformance.audience - 20)
            :this.startAmount ;
    }
    getVolumeCredits() {
        return super.getVolumeCredits() + Math.floor(this.aPerformance.audience/5)
    }
}

module.exports = { ComedyCalculator }