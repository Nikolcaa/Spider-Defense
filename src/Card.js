function Card(ID, x, y, size, color, grade) {
    this.ID = ID
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.grade = grade
    this.show = function(){
        push()
        fill(this.color)
        rect(this.x, this.y, this.size, this.size)
        pop()
    }
}