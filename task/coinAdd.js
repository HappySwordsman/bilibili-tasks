const Task = require('./task');

class CoinAdd extends Task {
    name = "视频投币"
    order = 6;

    constructor(args) {
        super(args);
    }

    async run() {
        let taskStatus = true
        try {
            const videoList = await this.$api.getWatchVideoListService();
            //安全检查，最多投币数
            const maxNumberOfCoins = 5;
            // 视频索引
            let videoIndex = 0;
            this.message = `#### ${this.name}： 已投币 `;
            for (let useCoin = 0; useCoin < maxNumberOfCoins; ++useCoin) {
                videoIndex = useCoin;
                let videoInfo = videoList[videoIndex];
                let isCoin = false
                // 查询到未投币的视频
                while (videoIndex < videoList.length) {
                    // 重置
                    isCoin = false;
                    // 判断当前视频是否已投币
                    const res = await this.$api.isCoinService(videoInfo.bvid)
                    if (res.multiply <= 0) break;
                    isCoin = true;
                    videoIndex++;
                    videoInfo = videoList[videoIndex];
                }
                // 查询到最后一个视频并且是已投币状态，直接结束
                if (videoIndex === videoList.length && isCoin) {
                    this.message += "没有视频可以投币了"
                    break;
                }
                // 投币 （无法判断进程启动时是否已投过，测试时请注释代码）
                await this.$api.coinAddService(videoInfo.bvid, this.getCookieField("bili_jct"));

                if (useCoin !== maxNumberOfCoins - 1) {
                    // 模拟停顿 2s
                    await this.pauseTime(2);
                }
                this.message += `${videoInfo.author} 的《${videoInfo.title}》${useCoin === maxNumberOfCoins - 1 ? '' : '、'}`
            }
        } catch (e) {
            this.message = `#### ${this.name}任务:  ${e.message}`;
            taskStatus = false;
        }
        return taskStatus
    }

    async pauseTime(millTime) {
        await new Promise((resolve) => {
            setTimeout(resolve, millTime * 1000);
        });
    }
}

module.exports = CoinAdd
