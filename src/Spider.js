function Spider(skin, hp) {
    this.show = function () {
        this.skin = skin
        this.w = this.skin.width / 6
        this.h = this.skin.height / 6
        this.x = width / 2 - this.w / 2
        this.y = height / 2 - this.h / 2
        this.hp = hp
        push()
        translate(width / 2, height / 2);
        rotate(PI / 2.0);
        let a = atan2(mouseY - height / 2, mouseX - width / 2);
        rotate(a);
        image(this.skin, -this.w / 2, -this.h / 2, this.w, this.h)
        pop()
    }
}