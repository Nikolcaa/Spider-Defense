function CardsCollectionBg(x, y, w, h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.show = function(){
        fill(0)
        rect(this.x, this.y, this.w, this.h)
    }
}