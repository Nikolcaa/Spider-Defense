function FloatingCard(ID, img, w, h, x, y, grade) {
    this.ID = ID
    this.img = img
    this.w = w
    this.h = h
    this.x = x
    this.y = y
    this.grade = grade
    this.show = function(){
        image(this.img, this.x, this.y, this.w, this.h)
    } 
}