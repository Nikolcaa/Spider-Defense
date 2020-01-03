function FieldForCard(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.show = function () {
        push()
        fill("black")
        stroke("white")
        strokeWeight(2)
        rect(this.x, this.y, this.w, this.h)
        pop()
    }
}

function FieldForCardBackground() {
    this.w = fieldForCardBackgroundImage.width
    this.h = fieldForCardBackgroundImage.height
    this.x = width/2 - this.w/2
    this.y = height - this.h
    this.show = function () {
        push()
        image(fieldForCardBackgroundImage, this.x, this.y)
        pop()
    }
}