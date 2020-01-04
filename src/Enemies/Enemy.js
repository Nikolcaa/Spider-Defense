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

    this.isFreezed = false
    this.isSlowed = false
    this.isPoisoned = false
    this.interval = null
    this.isMarkedByMiniSpider = false
    this.show = function () {
        push()
        this.Fill()
        rect(this.x, this.y, this.w, this.h)

        // hp

        textSize(15)
        fill("black");
        let hp = this.hp
        text(hp, this.x + this.w / 2 - 5, this.y + this.h + 15)
        pop()
    }

    this.Fill = function () {
        let Fill = fill(this.color)

        if (this.grade === "AssassinBee") {
            let d = dist(this.x, this.y, spider.x, spider.y)
            if (d <= 500 && d >= 350) {
                Fill = noFill()
            }
        }

        return Fill
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

    this.freezeUpdate = function () {
        // -- freezing --
        if (this.isFreezed) {
            this.speed = 0
        } else {
            this.speed = speed
        }
    }

    this.slowUpdate = function () {
        if (this.isSlowed) {
            this.speed /= 3
        } else {
            this.speed = speed
        }
    }

    this.CollisionCardArea = function (area) {
        if (area.grade === "freezeCardArea") {
            this.isFreezed = true
            this.freezeUpdate()

            setTimeout(() => {
                this.isFreezed = false
                this.freezeUpdate()
            }, 3000)

        } else if (area.grade === "slowCardArea") {
            this.isSlowed = true
            this.slowUpdate()

            setTimeout(() => {
                this.isSlowed = false
                this.slowUpdate()
            }, 5000)
        }
    }

    this.poisonInterval = function () {
        this.interval = setInterval(() => {
            this.hp -= 0.5
        }, 1000)
    }

    this.Dead = function () {
        setTimeout(() => {
            enemies = [...enemies.filter(el => el.ID !== this.ID)];
            QueenBeeSplit(this)

            // Delete all EnemyShield combinations that contain this enemy ID
            shieldEnemyCombinations = shieldEnemyCombinations.filter(C => C[0] !== this.ID);
            //markedEnemies = [...markedEnemies.filter(el => el.ID !== this.ID)];

        }, 1)
    }

    this.collisionSpider = function (enemy) {
        this.Dead()
        spiderHp -= 1
        if (enemy.grade === "Hornet") {
            numberOfWebs -= 1
        }
        if (spiderHp <= 0) {
            alert("izgubio si")
        }
    }
    this.collisionShield = function (shield) {
        this.hp -= 1
        this.color = "red"
    }

    this.collisionMiniSpider = function () {
        this.Dead()
    }
}