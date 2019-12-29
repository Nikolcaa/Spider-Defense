function Shield() {
    this.ID = parseInt(_.uniqueId())
    this.r = 200
    this.w = 20
    this.h = 20
    this.speed = 3
    this.angle = 0.0
    this.show = function () {
        push()
        fill("white");
        translate(width/2, height/2);
        rotate(this.angle)
        ellipse(-this.r, -this.r, this.w, this.h);
        pop()
    }
    this.move = function () {
        this.angle += 0.05;
    }
}