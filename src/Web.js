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
    this.show = function () {
        push()
        stroke(255);
        line(this.x, this.y, this.x2, this.y2);
        pop()
    }
    this.moveBack = function () {
        let ySpeed = Math.sqrt(Math.pow(this.speed, 2) / (Math.pow(Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y), 2) + 1))
        let xSpeed = (Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y)) * ySpeed
        if (this.x2 < this.x && this.y2 < this.y) {
            this.x2 += xSpeed
            this.y2 += ySpeed
            this.ifWebComeBack()
        } else if (this.x2 < this.x && this.y2 > this.y) {
            this.x2 += xSpeed
            this.y2 -= ySpeed
        } else if (this.x2 > this.x && this.y2 < this.y) {
            this.x2 -= xSpeed
            this.y2 += ySpeed
            this.ifWebComeBack()
        } else if (this.x2 > this.x && this.y2 > this.y) {
            this.x2 -= xSpeed
            this.y2 -= ySpeed
        }
    }

    this.moveForward = function (i) {
        let speed = 60
        let ySpeed = Math.sqrt(Math.pow(speed, 2) / (Math.pow(Math.abs(this.x - this.mousex) / Math.abs(this.y - this.mousey), 2) + 1))
        let xSpeed = (Math.abs(this.x - this.mousex) / Math.abs(this.y - this.mousey)) * ySpeed

        let d = dist(this.x2, this.y2, this.mousex, this.mousey)

        if (this.mousex < this.x && this.mousey < this.y) {
            this.x2 -= xSpeed
            this.y2 -= ySpeed
        } else if (this.mousex < this.x && this.mousey > this.y) {
            this.x2 -= xSpeed
            this.y2 += ySpeed
        } else if (this.mousex > this.x && this.mousey < this.y) {
            this.x2 += xSpeed
            this.y2 -= ySpeed
        } else if (this.mousex > this.x && this.mousey > this.y) {
            this.x2 += xSpeed
            this.y2 += ySpeed
        }

        if (d <= 30) {
            this.x2 = this.mousex
            this.y2 = this.mousey
            
            webs = [
                ...webs.map((item) => {
                    if (item.ID === web.ID) {
                        return {
                            ...item,
                            shouldComeBack: true
                        }
                    }
                    return item;
                })
            ]
        }

    }

    this.ifWebComeBack = function () {
        if (this.y2 >= this.y && this.x2 >= this.x || this.x2 <= this.x && this.y2 >= this.y) {
            this.y2 = this.y
            this.x2 = this.x
            this.active = false
            this.speed = 2
            return true;
        }
    }

    this.fastComeBack = function () {
        this.speed = 20
    }

    // --------- Enemy collision ----------
    this.collisionEnemy = function (enemy, i) {
        //-- changing enemy hp --
        enemy.hp -= 1

        //-- deleting enemy --
        if (enemy.hp === 0) {
            if (enemy.grade === "QueenBee") {
                enemy.QueenBeeSplit(enemy)
            }
            enemies = [...enemies.filter(el => el.ID !== enemy.ID)];
        }

        FastWebComeBackSpeed(this)
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
        cardsCollection.push({ ID: card.ID, img: card.img, w: card.img.width, h: card.img.height, grade })
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
