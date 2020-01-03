function Shield() {
    this.ID = parseInt(_.uniqueId());
    this.base = createVector(width / 2, height / 2)
    this.vec = createVector(200, 0)
    this.w = 15
    this.h = 40
    this.angle = 0
    this.speed = 0.025
    this.hp = 3
    this.show = function() {
        this.x = int(this.vec.x + width/2)
        this.y = int(this.vec.y + height/2)

        push()
        fill("white")
        translate(this.base.x, this.base.y)
        rotate(this.vec.heading())
        translate(this.vec.mag() - this.w, 0)
        rect(0, 0, this.w, this.h)
        pop()
    }

    this.Dead = function () {
        // Delete all EnemyShield combinations that contain this shield ID on [1] place
        // izbaciti shield iz shields
        shields = [...shields.filter(el => el.ID !== this.ID)];
        shieldEnemyCombinations = shieldEnemyCombinations.filter(C => C[1] !== this.ID);
    }
        
    this.move = function () {
        this.vec.rotate(this.speed)
    }

    this.collisionEnemy = function(){
        this.hp -= 1
    }
}