function Card(ID, x, y, img, size, grade) {
    this.ID = ID
    this.x = x
    this.y = y
    this.img = img
    this.size = size
    this.grade = grade
    this.show = function(){
        image(this.img, this.x, this.y, this.size, this.size)
    }
}