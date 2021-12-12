const Task = require('./task')

class DayTask extends Task {
    name = "每日状态"
    order = 1;

    constructor(args) {
        super(args);
    }

    async run() {
        let taskStatus = true
        try {
            process.env.USER_TASK_STATUS = JSON.stringify(await this.$api.dayTaskService());
            this.message = `#### ${this.name}任务: 请求本日任务状态成功`
        } catch (e) {
            this.message = `#### ${this.name}任务: ${e.message}`
            taskStatus = false
        }
        return taskStatus
    }
}

module.exports = DayTask;
