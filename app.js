const notice = require('./utils/notice');
const tasks = require("./task");
const _ = require("lodash");

module.exports = async function () {
    // run task
    let taskLists = Object.keys(tasks).filter((f) => !["Task", "Index"].includes(f));
    const taskList = taskLists
        .reduce((acc, taskName) => {
            const taskNameClass = require("./task/" + _.lowerFirst(taskName));
            const newObj = new taskNameClass();
            return acc.concat(newObj);
        }, [])
        .sort((x, y) => x.order - y.order);

    let taskMsgStr = '';
    for (const task of taskList) {
        console.log("\n");
        console.log(`----- 执行 ${task.name} -----`)
        const taskStatus = await task.run();
        taskMsgStr += `${task.message} \n`;
        if (taskStatus === false) {
            break;
        }
    }
    console.log(taskMsgStr)
    notice(taskMsgStr);
}
