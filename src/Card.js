function Card(ID, img, w, h, grade, x, y) {
    this.ID = ID
    this.x = x
    this.y = y
    this.img = img
    this.w = w
    this.h = h
    this.grade = grade
    this.show = function(){
        image(this.img, this.x, this.y, this.w, this.h)
    }
    this.mouseCollision = function(i){
        cardsCollection.splice(i, 1)
        renderingCardsCollection()
    }
}