function UseableCard(ID, img, w, h, x, y, grade) {
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

    this.mouseCollision = function(){
        useableCards = [...useableCards.filter(el => el.ID !== this.ID)];
        
        
        disabledCards = [
            ...disabledCards,
            this.grade
        ]


        switch(this.grade) {
            case 'freezeCard': {
                PowerOfCards(this.grade)
                break;
            };
            case 'sloweCard': {
                PowerOfCards(this.grade)
                break;
            };
            default: {
                console.log('undefined grade')
                break;
            }
        }
    }
}