
class PerformanceCalculator {

    constructor(aPerformance, aPlay) {
        this.aPerformance = aPerformance;
        this.aPlay = aPlay;
    }
    getVolumeCredits() {
        let result = 0;
        result += Math.max(this.aPerformance.audience - 30, 0);
        if(this.aPlay.type === 'comedy') {
            result += Math.floor(this.aPerformance.audience/5)
        }
        return result;
    }
    getAmount() {
        let result = 0;
        switch (this.aPlay.type) {
            case "tragedy":
                result = 40000;
                if(this.aPerformance.audience > 30) {
                    result += 1000 * (this.aPerformance.audience - 30);
                }
                break;

            case "comedy":
                result = 30000;
                if(this.aPerformance.audience > 20) {
                    result += 10000 + 500 * (this.aPerformance.audience - 20);
                }
                break;
            default:
                throw new Error(`Unknown type ${this.aPlay.type}`);
        }
        return result;
    }

}

module.exports = { PerformanceCalculator };