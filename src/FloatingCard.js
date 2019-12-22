function FloatingCard(ID, img, w, h, x, y, grade) {
    this.ID = ID
    this.img = img
    this.w = w
    this.h = h
    this.x = x
    this.y = y
    this.grade = grade
    this.a = 255
    this.b = 255
    this.c = 255
    this.show = function () {
        push()
        tint(this.a, this.b, this.c)
        image(this.img, this.x, this.y)
        pop()
    }
    this.Tint = function(){
        this.b = 0
        this.c = 0
        setTimeout(() => {
            this.b = 255
            this.c = 255
        }, 100)
    }

    this.delete = function () {
        setTimeout(() => {
            floatingCards = [...floatingCards.filter(el => el.ID !== this.ID)];
        }, 10000)
    }
}