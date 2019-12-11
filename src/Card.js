function Card(ID, x, y, img, size, color, grade) {
    this.ID = ID
    this.x = x
    this.y = y
    this.img = img
    this.size = size
    this.color = color
    this.grade = grade
    this.show = function(){
        image(this.img, this.x, this.y, this.img.width/20, this.img.height/20)
    }
}