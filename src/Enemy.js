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
        if (this.grade === "AssassinBee") {
            fill(this.color)
            var d = dist(this.x, this.y, spider.x, spider.y)
            if(d <= 500 && d >= 350){
                /* noStroke()
                this.color = "grey" */
                noStroke()
                noFill()
            }
        } else{
            fill(this.color)
        }
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

    this.QueenBeeSplit = function (enemy) {
        let xPos = enemy.x - 50
        let yPos = enemy.y + 50
        for (let i = 0; i < 2; i++) {
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