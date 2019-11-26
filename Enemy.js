function Enemy(x, y, r){
    this.x = x
    this.y = y
    this.r = r
    this.show = function(){
        fill("red")
        ellipse(this.x, this.y, this.r, this.r)
    }
}