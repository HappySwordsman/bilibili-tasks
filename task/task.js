const _ = require('lodash');
const globalConfig = require('../config.json');
const notice = require('../utils/notice');
const $api = require('../api')

class Task {
    // 任务名称
    name = "任务名称";
    // 任务消息文案
    message = "任务完成消息文案";
    // 任务排序
    order = 0;

    constructor() {
        // utils
        this._ = _;
        // notice
        this.$notice = notice;
        // apis
        this.$api = $api;
    }

    async run() {
        throw new Error("run() Must be implement");
    }

    getCookieField(field) {
        const res = globalConfig.cookie.split(";");
        const [tstr] = res.filter((f) => f.indexOf(field) !== -1);
        let [_, value] = tstr.split("=");
        return value;
    }
}

module.exports = Task;
