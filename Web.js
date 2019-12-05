function Web(ID, active, x, y, x2, y2, speed) {
    this.ID = ID
    this.active = active
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.speed = speed

    this.show = function () {
        fill(0)
        line(this.x, this.y, this.x2, this.y2);
    }
    this.move = function () {
        this.ySpeed = Math.sqrt(Math.pow(this.speed, 2) / (Math.pow(Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y), 2) + 1))
        this.xSpeed = (Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y)) * this.ySpeed
        if (this.x2 < this.x && this.y2 < this.y) {
            this.x2 += this.xSpeed
            this.y2 += this.ySpeed
            if (this.y2 >= this.y && this.x2 >= this.x) {
                this.active = true
                console.log("Web come back")
                this.speed = 2
            }
        } else if (this.x2 < this.x && this.y2 > this.y) {
            this.x2 += this.xSpeed
            this.y2 -= this.ySpeed
        } else if (this.x2 > this.x && this.y2 < this.y) {
            this.x2 -= this.xSpeed
            this.y2 += this.ySpeed
            if (this.x2 <= this.x && this.y2 >= this.y) {
                this.active = true
                console.log("web come back")
                this.speed = 2

            }
        } else if (this.x2 > this.x && this.y2 > this.y) {
            this.x2 -= this.xSpeed
            this.y2 -= this.ySpeed
        } 
    }

    this.collision = function (enemy) {
        /* if (this.x2 <= enemy.x + enemy.size &&
            this.x2 >= enemy.x &&
            this.y2 <= enemy.y + enemy.size &&
            this.y2 >= enemy.y) {
            return true
        } */
     
        if (mouseX <= enemy.x + enemy.size &&
            mouseX >= enemy.x &&
            mouseY <= enemy.y + enemy.size &&
            mouseY >= enemy.y) {
            return true
        }
    }
}