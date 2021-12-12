const Task = require('./task');

class LiveCheckin extends Task {
    name = "直播签到"
    order = 7;

    constructor(args) {
        super(args);
    }

    async run() {
        let taskStatus = true
        try {
            const res = await this.$api.liveCheckinService()
            this.message = `#### 直播签到成功，本次获得 ${res.text.specialText}`
        } catch (e) {
            this.message = `#### ${this.name}任务:  ${e.message}`;
            taskStatus = false;
        }
        return taskStatus
    }
}

module.exports = LiveCheckin
