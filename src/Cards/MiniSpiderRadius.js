function MiniSpiderRadius() {
    this.ID = parseInt(_.uniqueId())
    this.x = 150
    this.y = 150
    this.w = width - this.x*2
    this.h = height - this.y*2
    this.show = function(){
        push()
        strokeWeight(5)
        stroke("red")
        noFill()
        rect(this.x, this.y, this.w, this.h)
        pop()
    }
}