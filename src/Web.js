function Web(ID, active, x, y, x2, y2, speed, shouldComeBack, mousex, mousey) {
    this.ID = ID
    this.active = active
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.speed = speed
    this.shouldComeBack = shouldComeBack
    this.mousex = mousex
    this.mousey = mousey
    this.stroke = 'rgb(255,255,255)'
    this.isPoisoned = false
    this.comeBack = false
    this.show = function () {
        push()
        stroke(this.stroke);
        line(this.x, this.y, this.x2, this.y2);
        pop()
    }
    this.moveBack = function () {
        let ySpeed = Math.sqrt(Math.pow(this.speed, 2) / (Math.pow(Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y), 2) + 1))
        let xSpeed = (Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y)) * ySpeed
        if (this.x2 <= this.x && this.y2 <= this.y) {
            this.x2 += xSpeed
            this.y2 += ySpeed
            this.ifWebComeBack()
        } else if (this.x2 <= this.x && this.y2 >= this.y) {
            this.x2 += xSpeed
            this.y2 -= ySpeed
        } else if (this.x2 >= this.x && this.y2 <= this.y) {
            this.x2 -= xSpeed
            this.y2 += ySpeed
            this.ifWebComeBack()
        } else if (this.x2 >= this.x && this.y2 >= this.y) {
            this.x2 -= xSpeed
            this.y2 -= ySpeed
        }
    }

    /* this.moveForward = function (i) {
        let speed = 120
        let ySpeed = Math.sqrt(Math.pow(speed, 2) / (Math.pow(Math.abs(this.x - this.mousex) / Math.abs(this.y - this.mousey), 2) + 1))
        let xSpeed = (Math.abs(this.x - this.mousex) / Math.abs(this.y - this.mousey)) * ySpeed

        let d = dist(this.x2, this.y2, this.mousex, this.mousey)

        if (this.mousex <= this.x2 && this.mousey <= this.y2) {
            this.x2 -= xSpeed
            this.y2 -= ySpeed
        } else if (this.mousex <= this.x2 && this.mousey >= this.y2) {
            this.x2 -= xSpeed
            this.y2 += ySpeed
        } else if (this.mousex >= this.x2 && this.mousey <= this.y2) {
            this.x2 += xSpeed
            this.y2 -= ySpeed
        } else if (this.mousex >= this.x2 && this.mousey >= this.y2) {
            this.x2 += xSpeed
            this.y2 += ySpeed
        }
        if (d <= 30) {
            this.x2 = mousex
            this.y2 = mousey
            this.shouldComeBack = true
        }
    } */

    this.ifWebComeBack = function () {
        if (this.y2 >= this.y && this.x2 >= this.x || this.x2 <= this.x && this.y2 >= this.y) {
            this.y2 = this.y
            this.x2 = this.x
            this.active = false
            this.speed = 2
            this.comeBack = true
            if (activeCards.indexOf('poisonCard') !== -1) {
                this.poisoned()
            } else {
                this.unPoisoned()
            }
            //this.shouldComeBack = false
            //this.mousex = this.x
            //this.mousey = this.y
        }
    }

    this.poisoned = function () {
        this.stroke = 'rgb(0,255,0)'
        this.isPoisoned = true
    }

    this.unPoisoned = function () {
        this.stroke = 'rgb(255,255,255)'
        this.isPoisoned = false
    }

    this.fastComeBack = function () {
        this.speed = 20
    }

    // --------- Enemy collision ----------
    this.collisionEnemy = function (enemy, i) {
        //-- changing enemy hp --
        enemy.hp -= 1

        FastWebComeBackSpeed(this)

        if (this.isPoisoned) {
            if (enemy.isPoisoned) {
                return null;
            } else {
                enemy.isPoisoned = true
                enemy.poisonInterval()
            }
        }
    }

    // --------- Bonus collision ----------
    this.collisionBonus = function (bonus) {
        bonus.hp -= 1
        if (bonus.hp === 0) {
            // -- drop --
            if (bonus.drop === "heart") {
                if (spiderHp < maxSpiderHp) {
                    spiderHp += 1
                }
            } else if (bonus.drop === "emptyHeart") {
                maxSpiderHp += 1
            }

            // -- deleting bonus --
            bonuses = [...bonuses.filter(el => el.ID !== bonus.ID)];
        }

        FastWebComeBackSpeed(this)
    }

    // --------- CARDS COLLISIONS ----------
    this.collisionCard = function (card, grade) {
        // -- pushing card in cardsCollection
        cardsCollection.push({ ID: card.ID, img: card.img, w: card.img.width, h: card.img.height, grade, dragAndDrop: card.dragAndDrop, dropArea: card.dropArea })
        renderingCardsCollection()

        // -- deleting card from cards --
        floatingCards = [...floatingCards.filter(el => el.ID !== card.ID)];
        FastWebComeBackSpeed(this)
    }

}

function FastWebComeBackSpeed(web) {
    // -- changing webs --
    webs = [
        ...webs.map((item) => {
            if (item.ID === web.ID) {
                return {
                    ...item,
                    speed: webFastComeBackSpeed
                }
            }
            return item;
        })
    ]
}
