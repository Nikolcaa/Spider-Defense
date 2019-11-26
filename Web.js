function Web(ID, active, x, y, x2, y2, speed){
    this.ID = ID
    this.active = active
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2

    this.show = function(){
        fill(0)
        line(this.x, this.y, this.x2, this.y2);

    }
    this.move = function(){
        this.xSpeed = (Math.abs(this.x - this.x2) / Math.abs(this.y - this.y2)) * speed
        this.ySpeed = speed
        
        if(this.x2 < this.x && this.y2 < this.y){
            this.x2 += this.xSpeed
            this.y2 += this.ySpeed    
        }else if(this.x2 < this.x && this.y2 > this.y){
            this.x2 += this.xSpeed
            this.y2 -= this.ySpeed  
        }else if(this.x2 > this.x && this.y2 < this.y){
            this.x2 -= this.xSpeed
            this.y2 += this.ySpeed  
        }else if(this.x2 > this.x && this.y2 > this.y){
            this.x2 -= this.xSpeed
            this.y2 -= this.ySpeed  
        }

        if(this.x2 === this.x && this.y2 === this.y){

            console.log("asd")
        }
    }
}