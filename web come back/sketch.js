var web
function setup(){
    createCanvas(window.innerWidth, window.innerHeight)
    web = new Web(1000, 500, window.innerWidth/2, window.innerHeight/2, 5)
}

function keyPressed(){
    
}

function draw(){
    background("grey")
    frameRate(100)
    web.show()
    web.move()

}

function Web(x, y, x2, y2, speed){
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.xSpeed = (Math.abs(this.x - this.x2) / Math.abs(this.y - this.y2)) * this.ySpeed
    this.ySpeed = speed*speed - this.xSpeed*this.xSpeed
    this.show = function(){
        fill(0)
        line(this.x, this.y, this.x2, this.y2);
    }
    this.move = function(){
        if(this.x < this.x2 && this.y < this.y2){
            this.x += this.xSpeed
            this.y += this.ySpeed    
        }else if(this.x < this.x2 && this.y > this.y2){
            this.x += this.xSpeed
            this.y -= this.ySpeed  
        }else if(this.x > this.x2 && this.y < this.y2){
            this.x -= this.xSpeed
            this.y += this.ySpeed  
        }else if(this.x > this.x2 && this.y > this.y2){
            this.x -= this.xSpeed
            this.y -= this.ySpeed  
        }

        
        if(this.x === this.x2 && this.y === this.y2){
            this.xSpeed = 0
            this.ySpeed = 0
        }
    }
}