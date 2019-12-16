function Enemy(ID, x, y, speed, hp, w, h, color, grade) {
    this.ID = ID
    this.x = x
    this.y = y
    this.speed = speed
    this.hp = hp
    this.w = w
    this.h = h
    this.color = color
    this.grade = grade
    this.show = function () {
        push()
        fill(this.color)
        rect(this.x, this.y, this.w, this.h)
        pop()
    }

    this.move = function () {
        this.ySpeed = Math.sqrt(Math.pow(this.speed, 2) / (Math.pow(Math.abs(this.x - width / 2) / Math.abs(this.y - height / 2), 2) + 1))
        this.xSpeed = (Math.abs(this.x - width / 2) / Math.abs(this.y - height / 2)) * this.ySpeed

        if (this.x < width / 2 && this.y < height / 2) {
            this.x += this.xSpeed
            this.y += this.ySpeed
        } else if (this.x < width / 2 && this.y > height / 2) {
            this.x += this.xSpeed
            this.y -= this.ySpeed
        } else if (this.x > width / 2 && this.y < height / 2) {
            this.x -= this.xSpeed
            this.y += this.ySpeed

        } else if (this.x > width / 2 && this.y > height / 2) {
            this.x -= this.xSpeed
            this.y -= this.ySpeed
        }
    }

    this.collisionSpider = function (enemy) {
        setTimeout(function () {
            spiderHp -= 1
            enemies = [...enemies.filter(el => el.ID !== enemy.ID)];
            if (spiderHp <= 0) {
                alert("izgubio si")
            }
        }, 0.001)
    }

}