const request = require('../utils/request');
const qs = require('qs');

module.exports = {
    async getVideoTitleService(bvid) {
        const res = await request.get("https://api.bilibili.com/x/web-interface/view", {
            params: {
                bvid
            }
        })
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },

    async userCheckService() {
        return await request.get("https://api.bilibili.com/x/web-interface/nav");
    },
    async dayTaskService() {
        const res = await request.get('https://api.bilibili.com/x/member/web/exp/reward')
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },

    // 查询视频列表
    async getWatchVideoListService() {
        function __randomRegion() {
            const regions = [1, 3, 4, 5, 160, 22, 119];
            return regions[parseInt(Math.random() * regions.length)];
        }

        const res = await request.get("https://api.bilibili.com/x/web-interface/ranking/region", {
            params: {
                rid: __randomRegion(),
                day: 3,
            }
        })
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },
    // 观看视频
    async videoHeartBeatService(bvid, jct) {
        const res = await request.post("https://api.bilibili.com/x/click-interface/web/heartbeat", qs.stringify({
            bvid,
            csrf: jct
        }))
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },
    // 视频分享
    async videoShareService(bvid, jct) {
        const res = await request.post("https://api.bilibili.com/x/web-interface/share/add", qs.stringify({
            bvid,
            csrf: jct
        }))
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },
    // 漫画签到
    async mangaSignService() {
        const res = await request.post("https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn", qs.stringify({
            platform: "ios"
        }))
        if (res.code === 0) {
            return res.data
        }
        throw new Error("漫画签到异常");
    },
    // 银瓜子换硬币
    async silverToCoinService() {
        const res = await request.get("https://api.live.bilibili.com/pay/v1/Exchange/silver2coin");
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },
    // 查询银瓜子余额
    async silverCountService() {
        const res = await request.get("https://api.live.bilibili.com/pay/v1/Exchange/getStatus");
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },
    // 查询是否已投币
    async isCoinService(bvid) {
        const res = await request.get("https://api.bilibili.com/x/web-interface/archive/coins", {
            params: {
                bvid
            }
        });
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },
    // 投币
    async coinAddService(bvid, jct, multiply = 1, selectLike = 1) {
        const res = await request.post("https://api.bilibili.com/x/web-interface/coin/add", qs.stringify({
            bvid,
            csrf: jct,
            multiply,
            select_like: selectLike,
            cross_domain: true
        }));
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    },
    // 直播签到
    async liveCheckinService() {
        const res = await request.get("https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign");
        if (res.code === 0) {
            return res.data
        }
        throw new Error(JSON.stringify(res));
    }
}
