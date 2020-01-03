function MiniSpider() {
    this.ID = parseInt(_.uniqueId())
    this.x = random(width / 2 - 50, width / 2 + 50)
    this.y = random(height / 2 + 50, height / 2 - 50)
    this.w = 30
    this.h = 30
    this.active = false
    this.markedEnemy
    this.d
    this.show = function () {
        push()
        fill("black")
        rect(this.x, this.y, this.w, this.h)
        pop()
    }

    this.move = function () {
        this.active = true

        let speed = 10
        let ySpeed = Math.sqrt(Math.pow(speed, 2) / (Math.pow(Math.abs(this.x - this.markedEnemy.x) / Math.abs(this.y - this.markedEnemy.y), 2) + 1))
        let xSpeed = (Math.abs(this.x - this.markedEnemy.x) / Math.abs(this.y - this.markedEnemy.y)) * ySpeed

        if (this.markedEnemy.x <= this.x && this.markedEnemy.y <= this.y) {
            this.x -= xSpeed
            this.y -= ySpeed
        } else if (this.markedEnemy.x <= this.x && this.markedEnemy.y >= this.y) {
            this.x -= xSpeed
            this.y += ySpeed
        } else if (this.markedEnemy.x >= this.x && this.markedEnemy.y <= this.y) {
            this.x += xSpeed
            this.y -= ySpeed
        } else if (this.markedEnemy.x >= this.x && this.markedEnemy.y >= this.y) {
            this.x += xSpeed
            this.y += ySpeed
        }

    }

    this.Dead = function () {
        setTimeout(() => {
            miniSpiders = [...miniSpiders.filter(el => el.ID !== this.ID)];
        }, 1)
    }

    this.collisionEnemy = function () {
        this.Dead()
    }

    this.update = function () {
        for (let j = 0; j < enemies.length; j++) {
            this.d = dist(this.x, this.y, enemies[j].x, enemies[j].y)
            if (this.d <= 500 && !this.active && !enemies[j].isMarkedByMiniSpider) {
                enemies[j].isMarkedByMiniSpider = true
                markedEnemies.push(enemies[j])
                if (enemies[j].isMarkedByMiniSpider) {
                    this.markedEnemy = enemies[j]
                }
                //enemies[j].isMarkedByMiniSpider = false
            }
        }

    }
}