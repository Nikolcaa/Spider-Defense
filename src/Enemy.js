function Enemy(ID, x, y, speed, hp, size, color){
    this.ID = ID
    this.x = x
    this.y = y
    this.speed = speed
    this.hp = hp
    this.size = size
    this.color = color
    this.show = function(){
        push()
        fill(this.color)
        rect(this.x, this.y, this.size, this.size)
        pop()
    }

    this.move = function(){
        this.ySpeed = Math.sqrt(Math.pow(this.speed, 2) / (Math.pow(Math.abs(this.x - width/2) / Math.abs(this.y - height/2), 2) + 1))
        this.xSpeed = (Math.abs(this.x - width/2) / Math.abs(this.y - height/2)) * this.ySpeed

        if (this.x < width/2 && this.y < height/2) {
            this.x += this.xSpeed
            this.y += this.ySpeed
        } else if (this.x < width/2 && this.y > height/2) {
            this.x += this.xSpeed
            this.y -= this.ySpeed
        } else if (this.x > width/2 && this.y < height/2) {
            this.x -= this.xSpeed
            this.y += this.ySpeed
 
        } else if (this.x > width/2 && this.y > height/2) {
            this.x -= this.xSpeed
            this.y -= this.ySpeed
        } 

    }

}