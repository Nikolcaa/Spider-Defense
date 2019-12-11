function Web(ID, active, x, y, x2, y2, speed) {
    this.ID = ID
    this.active = active
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.speed = speed

    this.show = function () {
        push()
        stroke(255);
        line(this.x, this.y, this.x2, this.y2);
        pop()
    }
    this.move = function () {
        this.ySpeed = Math.sqrt(Math.pow(this.speed, 2) / (Math.pow(Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y), 2) + 1))
        this.xSpeed = (Math.abs(this.x2 - this.x) / Math.abs(this.y2 - this.y)) * this.ySpeed
        if (this.x2 < this.x && this.y2 < this.y) {
            this.x2 += this.xSpeed
            this.y2 += this.ySpeed
            if (this.y2 >= this.y && this.x2 >= this.x) {
                this.y2 = this.y
                this.x2 = this.x
                this.active = true
                this.speed = 2
            }
        } else if (this.x2 < this.x && this.y2 > this.y) {
            this.x2 += this.xSpeed
            this.y2 -= this.ySpeed
        } else if (this.x2 > this.x && this.y2 < this.y) {
            this.x2 -= this.xSpeed
            this.y2 += this.ySpeed
            if (this.x2 <= this.x && this.y2 >= this.y) {
                this.y2 = this.y
                this.x2 = this.x
                this.active = true
                this.speed = 2
            }
        } else if (this.x2 > this.x && this.y2 > this.y) {
            this.x2 -= this.xSpeed
            this.y2 -= this.ySpeed
        }
    }

    // --------- Enemy collision ----------
    this.collisionEnemy = function (enemy) {
        //-- changing enemy hp --
        enemy.hp -= 1

        //-- deleting enemy --
        if (enemy.hp === 0) {
            enemies = [...enemies.filter(el => el.ID !== enemy.ID)];
        }

        //-- changing webs --
        webs = [
            ...webs.map((item) => {
                if (item.ID === this.ID) {
                    return {
                        ...item,
                        speed: 10
                    }
                }
                return item;
            })
        ]
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

        // -- changing webs --
        webs = [
            ...webs.map((item) => {
                if (item.ID === this.ID) {
                    return {
                        ...item,
                        speed: 10
                    }
                }
                return item;
            })
        ]
    }

    // --------- CARDS COLLISIONS ----------

    // -- cardHeart --
    this.collisionCard = function (card, grade) {
        // -- chacking what is grade of card --
        /* if (grade === "freezeCard") {
            console.log("pokupio sam freezeCard")
        } */

        // -- pushing card in cardsCollection
        let xPos = 10
        let yPos = height - card.size - 10
        for(let i = 0; i < cardsCollection.length; i++){
            xPos += card.size
        }
        cardsCollection.push(new Card(card.ID, xPos, yPos, card.img, card.size, grade))



        // -- deleting card from cards --
        cards = [...cards.filter(el => el.ID !== card.ID)];

        // -- changing webs --
        webs = [
            ...webs.map((item) => {
                if (item.ID === this.ID) {
                    return {
                        ...item,
                        speed: 10
                    }
                }
                return item;
            })
        ]

    }
}
