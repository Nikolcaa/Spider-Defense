function MiniSpider() {
    this.ID = parseInt(_.uniqueId())
    this.x = width / 2 + 50
    this.y = height / 2 - 50
    this.w = 30
    this.h = 30
    this.active = false
    this.show = function () {
        push()
        fill("black")
        rect(this.x, this.y, this.w, this.h)
        pop()
    }

    this.move = function (enemy) {
        let speed = 10
        let ySpeed = Math.sqrt(Math.pow(speed, 2) / (Math.pow(Math.abs(this.x - enemy.x) / Math.abs(this.y - enemy.y), 2) + 1))
        let xSpeed = (Math.abs(this.x - enemy.x) / Math.abs(this.y - enemy.y)) * ySpeed

        let d = dist(this.x, this.y, enemy.x, enemy.y)

        if (enemy.x <= this.x && enemy.y <= this.y) {
            this.x -= xSpeed
            this.y -= ySpeed
        } else if (enemy.x <= this.x && enemy.y >= this.y) {
            this.x -= xSpeed
            this.y += ySpeed
        } else if (enemy.x >= this.x && enemy.y <= this.y) {
            this.x += xSpeed
            this.y -= ySpeed
        } else if (enemy.x >= this.x && enemy.y >= this.y) {
            this.x += xSpeed
            this.y += ySpeed
        }
    }

}