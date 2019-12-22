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
    this.enemiesPower = function(){
        EnemiesPower(this)
    }

    this.show = function () {
        fill(this.color)
        rect(this.x, this.y, this.w, this.h)
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

    this.QueenBeeSplit = function (enemy) {
        let xPos = enemy.x - 50
        let yPos = enemy.y + 50
        let numOfNewBees = random(0, 3)
        for (let i = 0; i < numOfNewBees; i++) {
            setTimeout(() => {
                enemies.push(new Enemy(parseInt(_.uniqueId()), xPos, yPos, enemiesClasses.Bee.speed, enemiesClasses.Bee.hp, enemiesClasses.Bee.w, enemiesClasses.Bee.h, enemiesClasses.Bee.color, enemiesClasses.Bee.grade))
                xPos += 50
                yPos -= 50
            }, 1)
        }
    }

    this.collisionSpider = function (enemy) {
        setTimeout(function () {
            spiderHp -= 1
            enemies = [...enemies.filter(el => el.ID !== enemy.ID)];

            if (enemy.grade === "Hornet") {
                numberOfWebs -= 1
            }

        }, 10)

        if (spiderHp <= 0) {
            alert("izgubio si")
        }

    }

}