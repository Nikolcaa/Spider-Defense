function FloatingCard(ID, img, w, h, dragAndDrop, x, y, grade) {
    this.ID = ID
    this.img = img
    this.w = w
    this.h = h
    this.dragAndDrop = dragAndDrop
    this.x = x
    this.y = y
    this.grade = grade
    this.a = 255
    this.b = 255
    this.c = 255
    this.tinted = function (a, b, c) {
        this.a = a
        this.b = b
        this.c = c
    }
    this.show = function () {
        push()
        tint(this.a, this.b, this.c)
        image(this.img, this.x, this.y)
        pop()
    }
    this.BlinkRed = function () {
        this.tinted(255, 0, 0)
        setTimeout(() => {
            this.tinted(255, 255, 255)
        }, 100)
    }

    this.delete = function () {
        setTimeout(() => {
            floatingCards = [...floatingCards.filter(el => el.ID !== this.ID)];
        }, 6000)
    }
}