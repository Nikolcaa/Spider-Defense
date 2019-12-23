function Enemy(ID, x, y, speed, hp, w, h, color, grade) {
    this.ID = ID
    this.x = x
    this.y = y
    this.speed = grade === "AssassinBee" ? random(2, 3.5) : speed
    this.hp = grade === "Bumblebee" ? int(random(2, 4)) : hp
    this.w = w
    this.h = h
    this.color = color
    this.grade = grade
    this.isPoisoned = false
    this.interval = null
    this.show = function () {
        fill(this.color)
        rect(this.x, this.y, this.w, this.h)

        AssassinBeeInvisible(this)
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

    this.poisonInterval = function () {
        this.interval = setInterval(() => {
            this.hp -= 0.5
            if (this.isDead()) {
                enemies = [...enemies.filter(el => el.ID !== this.ID)];
                QueenBeeSplit(this)
            }
        }, 1000)
    }

    this.isDead = function () {
        if (this.hp <= 0) {
            clearInterval(this.interval)
            return true
        }
    }

    this.collisionSpider = function (enemy) {
        setTimeout(function () {
            spiderHp -= 1
            enemies = [...enemies.filter(el => el.ID !== enemy.ID)];

            if (enemy.grade === "Hornet") {
                numberOfWebs -= 1
            }
        }, 1)
        if (spiderHp <= 1) {
            alert("izgubio si")
        }

    }

}