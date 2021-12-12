const Task = require('./task');

class SilverToCoin extends Task {
    name = "瓜子换硬币"
    order = 5;

    constructor(args) {
        super(args);
    }

    async run() {
        try {
            await this.$api.silverToCoinService();
        } catch (e) {
            this.message = `#### ${this.name}任务: 银瓜子余额可能不足，未兑换成功`
        }
        try {
            const res = await this.$api.silverCountService();
            this.message += ` 银瓜子余额 ${res.silver}`
        } catch (e) {
            this.message += '银瓜子余额查询失败'
        }

        return true
    }
}

module.exports = SilverToCoin
