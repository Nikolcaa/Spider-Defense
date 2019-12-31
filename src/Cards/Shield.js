function Shield() {
    this.base = createVector(width / 2, height / 2)
    this.vec = createVector(300, 0)
    this.w = 15
    this.h = 40
    this.angle = 0
    this.speed = 0.025
    this.show = function() {
        this.x = int(this.vec.x + width/2)
        this.y = int(this.vec.y + height/2)

        push()
        fill("white")
        translate(this.base.x, this.base.y)
        rotate(this.vec.heading())
        translate(this.vec.mag() - this.w, 0)
        rect(0, 0, this.w, this.h)
        pop()
    }
        
    this.move = function () {
        this.vec.rotate(this.speed)
    }
}