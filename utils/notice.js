const RobotDing = require("@tnnevol/robot-ding");
const dayjs = require('dayjs');
const config = require("../config.json");

const ding = new RobotDing(config.ding);
module.exports = (content) => {
    ding.sendDing(
        {
            title: `${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")} Bilibili 通知：`,
            text: `### ${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")} Bilibili 通知： \n ${content}`
        },
        "markdown"
    );
};
