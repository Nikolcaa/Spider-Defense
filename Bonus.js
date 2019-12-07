function Bonus(ID, x, y, speed, hp, size, color){
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
        this.ySpeed = speed
        this.xSpeed = speed

        this.x += this.xSpeed
        this.y += this.ySpeed
    }

}