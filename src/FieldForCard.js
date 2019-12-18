function FieldForCard(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.show = function(){
        push()
        fill("black")
        stroke("blue")
        strokeWeight(2)
        rect(this.x, this.y, this.w, this.h)
        pop()
    }
    
}