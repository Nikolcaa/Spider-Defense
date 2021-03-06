function UseableCard(ID, img, w, h, grade, dragAndDrop, x, y) {
    this.ID = ID
    this.img = img
    this.w = w
    this.h = h
    this.grade = grade
    this.dragAndDrop = dragAndDrop
    this.x = x
    this.y = y
    this.dragging = false
    this.pressed = false
    this.xOffset = 0
    this.yOffset = 0
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
        this.pressed = true
        this.xOffset = mouseX - this.x
        this.yOffset = mouseY - this.y
        currentlyDraggedCard = this
    }

    this.mouseStartDragged = function () {
        this.dragging = true

        if (this.pressed) {
            this.x = mouseX - this.xOffset;
            this.y = mouseY - this.yOffset;
        }
    }

    this.mouseReleased = function () {
        for (let i = 0; i < fieldsForCards.length; i++) {
            if (MouseCollision(fieldsForCards[i])) {
                this.dragging = false
            }
        }
        if (this.dragging) {
            cardsCollection = [...cardsCollection.filter(el => el.ID !== this.ID)];
            renderingCardsCollection()
            activeCards.push(this.grade)

            if (this.grade === 'freezeCard') {
                this.PowerOfFreezeCard()
            }
            else if (this.grade === 'websComeBackCard') {
                this.PowerOfWebsComeBackCard()
            }
            else if (this.grade === 'poisonCard') {
                this.PowerOfPoisonCard()
            }

        } else {
            this.x = this.defX
            this.y = this.defY
        }
        this.dragging = false
        this.pressed = false
    }

    this.PowerOfFreezeCard = function () {
        let freezeArea = new FreezeArea(parseInt(_.uniqueId()), mouseX, mouseY, 200, 200)
        freezeAreas.push(freezeArea)
            for (let j = 0; j < enemies.length; j++) {
                freezeArea.jebemliga(enemies[j])
            }
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

}