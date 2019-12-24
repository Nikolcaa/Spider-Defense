function UseableCard(ID, img, w, h, grade, x, y) {
    this.ID = ID
    this.img = img
    this.w = w
    this.h = h
    this.grade = grade
    this.x = x
    this.y = y
    this.show = function () {
        push()
        tint(activeCards.indexOf(this.grade) !== -1 ? (200, 200, 200) : (255, 255, 255))
        image(this.img, this.x, this.y)
        pop()
    }

    this.mouseCollision = function (web) {
        cardsCollection = [...cardsCollection.filter(el => el.ID !== this.ID)];
        renderingCardsCollection()

        activeCards.push(this.grade)

        if (this.grade === 'freezeCard') {
            this.PowerOfFreezeCard()
        }
        else if (this.grade === 'websComeBackCard') {
            this.PowerOfWebsComeBackCard(web)
        }
        else if (this.grade === 'poisonCard') {
            this.PowerOfPoisonCard()
        }
    }

    this.PowerOfFreezeCard = function () {
        bgColor = 'cyan'
        enemies = [
            ...enemies.map(enemy => {
                currentEnemiesSpeed = 0
                return {
                    ...enemy,
                    speed: currentEnemiesSpeed,
                }
            })
        ]
        setTimeout(() => {
            bgColor = 'grey';
            activeCards.splice(activeCards.indexOf(this.grade), 1);

            BackToNormalEnemiesSpeed()
        }, 1000)
    }

    this.PowerOfWebsComeBackCard = function (web) {
        for (let i = 0; i < webs.length; i++) {
            if (webs[i].active) {
                webs[i].fastComeBack()
            }
        }

        activeCards.splice(activeCards.indexOf(this.grade), 1);
    }

    this.PowerOfPoisonCard = function () {
        for (let i = 0; i < webs.length; i++) {
            if (!webs[i].active) {
                webs[i].poisoned()
            }
        }

        setTimeout(() => {
            for (let i = 0; i < webs.length; i++) {
                if (!webs[i].active) {
                    webs[i].unPoisoned()
                }
            }

            activeCards.splice(activeCards.indexOf(this.grade), 1);
        }, 6000)
    }
}

function BackToNormalEnemiesSpeed() {
    Object.keys(enemiesClasses).map((cenemy, index) => {
        currentEnemiesSpeed = enemiesClasses[cenemy].speed
        enemies = [
            ...enemies.map(enemy => {
                if (enemy.grade === cenemy) {
                    return {
                        ...enemy,
                        speed: currentEnemiesSpeed
                    }
                }
                return enemy;
            })
        ]
    })
}