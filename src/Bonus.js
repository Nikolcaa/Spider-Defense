function Bonus(ID, x, y, img, speed, hp, w, h, drop){
    this.ID = ID
    this.x = x
    this.y = y
    this.img = img
    this.speed = speed
    this.hp = hp
    this.w = w
    this.h = h
    this.drop = drop
    this.show = function(){
        push()
        image(this.img, this.x, this.y, this.w, this.h)
        pop()
    }
    this.move = function(){
        this.ySpeed = speed
        this.xSpeed = speed

        this.x += this.xSpeed
        this.y += this.ySpeed

        if(this.x >= width || this.y >= height){
            bonuses = [...bonuses.filter(el => el.ID !== this.ID)];
        }
    }

}