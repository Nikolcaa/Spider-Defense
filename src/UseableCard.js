function UseableCard(ID, img, w, h, grade, x, y, ) {
    this.ID = ID
    this.img = img
    this.w = w
    this.h = h
    this.grade = grade
    this.x = x
    this.y = y
    this.show = function(){
        image(this.img, this.x, this.y, this.w, this.h)
    } 

    this.mouseCollision = function(card){
        cardsCollection = [...cardsCollection.filter(el => el.ID !== card.ID)];
        renderingCardsCollection()
        
        disabledCards.push(this.grade)

        PowerOfCards(this.grade)
    }
}