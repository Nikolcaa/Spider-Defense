function CardArea(ID, x, y, w, h, color, grade) {
    this.ID = ID
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
    this.grade = grade
    this.time = 3000
    this.show = function () {
        push()
        noStroke()
        fill(this.color)
        ellipse(this.x, this.y, this.w, this.h)
        pop()
    }

    this.timeout = function () {
        activeCards.splice(activeCards.indexOf(this.grade), 1)

        setTimeout(() => {
            cardsAreas = [...cardsAreas.filter(el => el.ID !== this.ID)];
        }, this.time)
    }

    this.collision = function (enemy) {
        if (CollisionEllipse(this, enemy)) {
            enemy.CollisionCardArea(this)
        }
        this.timeout()
    }
}