function CardArea(ID, x, y, size, color, grade, time) {
    this.ID = ID
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.grade = grade
    this.time = time
    this.show = function () {
        push()
        noStroke()
        fill(this.color)
        ellipse(this.x, this.y, this.size, this.size)
        pop()
    }

    this.timeout = function () {
        activeCards.splice(activeCards.indexOf(this.grade), 1)

        setTimeout(() => {
            cardsAreas = [...cardsAreas.filter(el => el.ID !== this.ID)];
        }, this.time)
    }

    this.collision = function (enemy) {
        if (CollisionRectEllipse(enemy, this)) {
            enemy.CollisionCardArea(this)
        }
        this.timeout()
    }
}