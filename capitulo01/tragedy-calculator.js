const {PerformanceCalculator} = require("./performance-calculator");

class TragedyCalculator extends PerformanceCalculator{
    constructor(aPerformance, aPlay) {
        super(aPerformance, aPlay);
        this.startAmount = 40000;
        this.aPerformance = aPerformance;
        this.aPlay = aPlay;
    }
    getAmount() {
        return (this.aPerformance.audience > 30)
            ? this.startAmount + 1000 * (this.aPerformance.audience - 30)
            : this.startAmount;
    }
    getVolumeCredits() {
        return super.getVolumeCredits();
    }
}
module.exports = { TragedyCalculator }