const Task = require('./task');

class MangaSign extends Task {
    name = "漫画签到"
    order = 4;

    constructor(args) {
        super(args);
    }

    async run() {
        try {
            await this.$api.mangaSignService();
            this.message = `#### ${this.name}任务: 已完成。`;
        } catch (e) {
            this.message = `#### ${this.name}任务: ${e.message}`;
        }
        return true
    }
}

module.exports = MangaSign
