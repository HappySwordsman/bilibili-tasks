const Task = require('./task');

class VideoShare extends Task {
    name = "视频分享"
    order = 3;
    constructor(args) {
        super(args);
    }
    async run() {
        const userTaskStatus = JSON.parse(process.env.USER_TASK_STATUS);
        let taskStatus = true
        try {
            if (userTaskStatus.share) {
                this.message = `#### ${this.name}任务: 已经完成了，不需要再分享视频了`
            } else {
                const videoList = await this.$api.getWatchVideoListService();
                const videoIndex = parseInt(Math.random() * videoList.length);
                const shareInfo = videoList[videoIndex];
                await this.$api.videoShareService(shareInfo.bvid, this.getCookieField("bili_jct"));
                this.message = `#### ${this.name}任务: 已分享 ${shareInfo.author} 的《${shareInfo.title}》`
            }
        } catch (e) {
            this.message = `#### ${this.name}任务: ${e.message}`
            taskStatus = false
        }
        return taskStatus
    }
}

module.exports = VideoShare
