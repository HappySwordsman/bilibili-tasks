const Task = require('./task');

class UserCheck extends Task {
    name = "用户登录检查"
    order = 0;

    constructor(args) {
        super(args);
    }

    async run() {
        try {
            const res = await this.$api.userCheckService();
            const isLogin = this._.get(res, "data.isLogin");
            const username = this._.get(res, "data.uname");
            const money = this._.get(res, "data.money");
            if (isLogin) {
                this.message = `#### ${this.name}任务: ${username}的当前金币余额${money}`
                return true;
            }
            throw new Error();
        } catch (e) {
            this.message = '#### ${this.name}任务: 登录失效'
            return false
        }
    }
}

module.exports = UserCheck;
