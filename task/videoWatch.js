const Task = require('./task');

class VideoWatch extends Task {
    name = "视频观看"
    order = 2;

    constructor(args) {
        super(args);
    }

    async run() {
        const userTaskStatus = JSON.parse(process.env.USER_TASK_STATUS);
        let taskStatus = true
        try {
            if (userTaskStatus.watch) {
                this.message = `#### ${this.name}任务: 已经完成了，不需要再观看视频了`
            } else {
                const videoList = await this.$api.getWatchVideoListService();
                const videoIndex = parseInt(Math.random() * videoList.length);
                const watchInfo = videoList[videoIndex];
                await this.$api.videoHeartBeatService(watchInfo.bvid, this.getCookieField("bili_jct"));
                this.message = `#### ${this.name}任务: 已观看 ${watchInfo.author} 的《${watchInfo.title}》`
            }
        } catch (e) {
            this.message = `#### ${this.name}任务: ${e.message}`
            taskStatus = false
        }
        return taskStatus
    }
}

module.exports = VideoWatch;
