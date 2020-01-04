function CardAreaRange(ID, x, y, size) {
    this.ID = ID
    this.x = x
    this.y = y
    this.size = size
    this.show = function () {
        push()
        stroke("black")
        fill(255, 0, 0, 10); 
        ellipse(this.x, this.y, this.size, this.size)
        pop()
    }
}