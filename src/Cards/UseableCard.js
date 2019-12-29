function UseableCard(ID, img, w, h, grade, dragAndDrop, dropArea, x, y) {
    this.ID = ID
    this.img = img
    this.w = w
    this.h = h
    this.grade = grade
    this.dragAndDrop = dragAndDrop
    this.dropArea = dropArea
    this.x = x
    this.y = y
    this.active = false
    this.pressed = false
    this.defX = x
    this.defY = y
    this.show = function () {
        push()
        tint(activeCards.indexOf(this.grade) !== -1 ? (200, 200, 200) : (255, 255, 255))
        image(this.img, this.x, this.y)
        pop()
    }
    // -- Drag and drop --
    this.mousePressed = function () {
        if (this.dragAndDrop) {
            this.active = false
            currentlyDraggedCard = this
        } else {
            this.activatePower()
        }
    }

    this.activatePower = function () {
        cardsCollection = [...cardsCollection.filter(el => el.ID !== this.ID)];
        renderingCardsCollection()
        activeCards.push(this.grade)

        if (this.grade === 'websComeBackCard') {
            this.PowerOfWebsComeBackCard()
        }
        else if (this.grade === 'poisonCard') {
            this.PowerOfPoisonCard()
        } else if (this.grade === 'shieldCard') {
            this.PowerOfShieldCard()
        }
    }

    this.mouseDragging = function () {
        this.active = true
        this.x = mouseX - this.w / 2
        this.y = mouseY - this.h / 2
    }

    this.mouseReleased = function () {
        for (let i = 0; i < fieldsForCards.length; i++) {
            if (MouseCollision(fieldsForCards[i])) {
                this.active = false
            }
        }
        if (this.active) {
            cardsCollection = [...cardsCollection.filter(el => el.ID !== this.ID)];
            renderingCardsCollection()
            activeCards.push(this.grade)

            if (this.grade === 'freezeCard') {
                renderingCardsAreas(this)

                for (let i = 0; i < enemies.length; i++) {
                    cardArea.collision(enemies[i])
                }
            }

            else if (this.grade === 'slowCard') {
                renderingCardsAreas(this)

                for (let i = 0; i < enemies.length; i++) {
                    cardArea.collision(enemies[i])
                }
            }
        } else {
            this.x = this.defX
            this.y = this.defY
        }
        this.active = false
    }

    this.PowerOfWebsComeBackCard = function () {
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

    this.PowerOfShieldCard = function () {
        renderingShield()
        activeCards.splice(activeCards.indexOf(this.grade), 1);

    }

}