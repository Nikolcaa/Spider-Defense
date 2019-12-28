function CardAreaRange(ID, x, y, w, h) {
    this.ID = ID
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.show = function () {
        push()
        stroke("black")
        fill(255, 0, 0, 10); 
        ellipse(this.x, this.y, this.w, this.h)
        pop()
    }
}