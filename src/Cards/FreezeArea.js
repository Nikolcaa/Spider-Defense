function FreezeArea(ID, x, y, w, h) {
    this.ID = ID
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.show = function () {
        push()
        noStroke()
        fill("aqua")
        ellipse(this.x, this.y, this.w, this.h)
        pop()
    }

    this.timeout = function (enemy) {
        activeCards.splice(activeCards.indexOf(this.grade), 1)

        setTimeout(() => {
            freezeAreas = [...freezeAreas.filter(el => el.ID !== this.ID)];
        }, 3000)
    }

    this.jebemliga = function(enemy){
        if (CollisionEllipse(this, enemy)) {
            enemy.CollisionFreezedArea(this)
        }
        this.timeout()
    }
}