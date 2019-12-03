function Spider(skin) {
    this.show = function () {
        //fill(0)
        //ellipse(this.x, this.y, this.r, this.r)

        this.skin = skin
        this.w = this.skin.width / 3
        this.h = this.skin.height / 3
        this.x = width / 2 - this.w / 2
        this.y = height / 2 - this.h / 2


        push()
        translate(width / 2, height / 2);
        rotate(PI / 2.0);
        let a = atan2(mouseY - height / 2, mouseX - width / 2);
        rotate(a);
        image(this.skin, -this.w/2, -this.h/2, this.w, this.h)
        pop()


    }
    this.collision = function (enemy) {
        if (this.x <= enemy.x + enemy.size / 2 &&
            this.x + this.w >= enemy.x &&
            this.y <= enemy.y + enemy.size / 2 &&
            this.y + this.h >= enemy.y) {
            console.log("enemy hit the spider")
            enemy.speed = 0
        }
    }
}