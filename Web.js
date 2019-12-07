function Web(ID, active, x, y, x2, y2, speed) {
    this.ID = ID
    this.active = active
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.speed = speed

    this.show = function () {
        push()
        stroke(255);
        line(this.x, this.y, this.x2, this.y2);
        pop()
    }
    this.move = function () {
        this.ySpeed = Math.sqrt(Math.pow(this.speed, 2) / (Math.pow(Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y), 2) + 1))
        this.xSpeed = (Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y)) * this.ySpeed
        if (this.x2 < this.x && this.y2 < this.y) {
            this.x2 += this.xSpeed
            this.y2 += this.ySpeed
            if (this.y2 >= this.y && this.x2 >= this.x) {
                this.y2 = this.y
                this.x2 = this.x
                this.active = true
                this.speed = 2
            }
        } else if (this.x2 < this.x && this.y2 > this.y) {
            this.x2 += this.xSpeed
            this.y2 -= this.ySpeed
        } else if (this.x2 > this.x && this.y2 < this.y) {
            this.x2 -= this.xSpeed
            this.y2 += this.ySpeed
            if (this.x2 <= this.x && this.y2 >= this.y) {
                this.y2 = this.y
                this.x2 = this.x
                this.active = true
                this.speed = 2
            }
        } else if (this.x2 > this.x && this.y2 > this.y) {
            this.x2 -= this.xSpeed
            this.y2 -= this.ySpeed
        }
    }

    this.collision = function (enemy) {
        //-- changing enemy hp --
        enemy.hp -= 1
  
        //-- deleting enemy --
        if(enemy.hp === 0){
            enemies = [...enemies.filter(el => el.ID !== enemy.ID)];
        }

        //-- changing webs --
        webs = [
            ...webs.map((item) => {
                if (item.ID === this.ID) {
                    return {
                        ...item,
                        speed: 10
                    }
                }
                return item;
            })
        ]
    }
}
