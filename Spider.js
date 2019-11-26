function Spider(){
    this.x = width/2
    this.y = height/2
    this.r = 50
    this.show = function(){
        fill(0)
        ellipse(this.x, this.y, this.r, this.r)
    }
}