var webs,
    webFastComeBackSpeed = 8,
    webComeBackSpeed = 2,
    numberOfWebs = 8,
    web,

    lvlsData,
    currentStage,
    currentGroup = 0,

    enemiesClasses,
    enemies = [],

    bonusClasses,
    bonuses = [],

    score = 0,

    heart,
    hearts = [],

    cardsClasses,
    floatingCards = [],
    useableCards = [],
    cardsCollection = [],
    activeCards = [],

    cardsAreasData,
    cardsAreas = [],
    cardArea,
    cardAreaRange,

    shields = [],
    shield,

    currentlyDraggedCard = null,

    fields = 6,
    fieldsForCards = [],
    fieldForCardBackground,

    spider,
    spiderHp = 400,
    maxSpiderHp = 8,
    skin1, skin2, skin3, skin4, skin5, skin6, skin7, skin8, skin9,

    /*     miniSpiders = [],
        miniSpiders,
        miniSpiderRadius,
        markedEnemies = [], */

    shieldEnemyCombinations = [],

    bgImage;

// Tools

const isUniqueESCombination = (eID, sID) => {
    let flag = true;

    shieldEnemyCombinations.forEach((C) => {
        if (C[0] === eID && C[1] === sID) {
            flag = false;
        };
    });

    return flag;
}

// ---------------- render functions -----------------
function renderingWebs() {
    for (let i = 0; i < numberOfWebs; i++) {
        webs[i] = new Web(webs[i].ID, webs[i].active, webs[i].x, webs[i].y, webs[i].x2, webs[i].y2, webs[i].speed, webs[i].shouldComeBack, webs[i].mousex, webs[i].mousey)
    }
}

function renderingStages() {
    currentStage = lvlsData.tutorial
}

function renderingEnemies() {
    // -- levels --  -- enemies --
    Object.keys(currentStage[currentGroup]).map((classes, index) => {
        Object.keys(enemiesClasses).map((grade, key) => {
            if (classes === grade) {
                for (let i = 0; i < currentStage[currentGroup][classes]; i++) {
                    let xPos = randomEnemyPositionX(width)
                    let yPos = randomEnemyPositionY(height)
                    enemies.push(new Enemy(
                        parseInt(_.uniqueId()),
                        xPos,
                        yPos,
                        enemiesClasses[grade].speed,
                        enemiesClasses[grade].hp,
                        enemiesClasses[grade].w,
                        enemiesClasses[grade].h,
                        enemiesClasses[grade].color,
                        enemiesClasses[grade].grade
                    ))

                }
            }
        })
    })
}

function renderingBonuses() {
    // -- levels --  -- bonuses --
    Object.keys(currentStage[currentGroup]).map((classes, index) => {
        Object.keys(bonusClasses).map((grade, index) => {
            if (classes === grade) {
                for (let i = 0; i < currentStage[currentGroup][classes]; i++) {
                    let xPos = randomBonusPositionX(width)
                    let yPos = randomBonusPositionY(height)
                    bonuses.push(new Bonus(
                        parseInt(_.uniqueId()),
                        xPos,
                        yPos,
                        bonusClasses[grade].img,
                        bonusClasses[grade].speed,
                        bonusClasses[grade].hp,
                        bonusClasses[grade].w,
                        bonusClasses[grade].h,
                        bonusClasses[grade].drop
                    ))
                }
            }
        })
    })
}

function renderingFloatingCards(currentBonus) {
    // -- bonuses --  -- cards --
    Object.keys(cardsClasses).map((classes, index) => {
        let xPos = mouseX - cardsClasses[classes].img.width / 2
        let yPos = mouseY - cardsClasses[classes].img.height / 2
        if (currentBonus.drop === classes) {
            floatingCards.push(new FloatingCard(
                parseInt(_.uniqueId()),
                cardsClasses[classes].img,
                cardsClasses[classes].img.width,
                cardsClasses[classes].img.height,
                xPos,
                yPos,
                classes,
                cardsClasses[classes].dropArea,
                cardsClasses[classes].dragAndDrop,
            ))
            for (let i = 0; i < floatingCards.length; i++) {
                floatingCards[i].delete()
            }
        }
    })
}

function renderingCardsCollection() {
    let yPos = fieldsForCards[0].y
    let xPos = fieldsForCards[0].x

    useableCards = [];

    for (let i = 0; i < cardsCollection.length; i++) {
        useableCards.push(new UseableCard(
            ...Object.values(cardsCollection[i]),
            xPos + i * 80,
            yPos
        ))
    }
}

function renderingFieldsForCards() {
    let w = 70
    let h = 80
    let yPos = height - h - 8;
    let xPos = (width - w * fields) / 2 - 25;

    for (let i = 0; i < fields; i++) {
        fieldsForCards.push(new FieldForCard(xPos + i * 80, yPos, w, h))
    }

    fieldForCardBackground = new FieldForCardBackground()
}

function renderingCardsAreas(card) {
    Object.keys(cardsAreasData).map((classes, index) => {
        if (classes === card.dropArea) {
            let xPos = mouseX
            let yPos = mouseY
            cardArea = new CardArea(
                parseInt(_.uniqueId()),
                xPos,
                yPos,
                cardsAreasData[classes].w,
                cardsAreasData[classes].h,
                cardsAreasData[classes].color,
                classes,
                cardsAreasData[classes].time,
            )
            cardArea.timeout()
            cardArea.update()
            cardsAreas.push(cardArea)
        }
    })
}

function renderingCardsAreaRange() {
    Object.keys(cardsAreasData).map((classes, index) => {
        if (currentlyDraggedCard.dropArea === classes) {
            let xPos = mouseX
            let yPos = mouseY
            cardAreaRange = new CardAreaRange(
                parseInt(_.uniqueId()),
                xPos,
                yPos,
                cardsAreasData[classes].w,
                cardsAreasData[classes].h,
            )
        }
    })
    cardAreaRange.show()
}

function renderingShield() {
    shield = new Shield()
    shields.push(shield)
}

function renderingMiniSpiders() {
    miniSpider = new MiniSpider()
    miniSpiders.push(miniSpider)
}

function preload() {
    Skins()
    // -- score updating --
    var scoreUpdateInterval = setInterval(function () {
        score += 1
    }, 1000)
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    /* miniSpider = new MiniSpider()
    miniSpiderRadius = new MiniSpiderRadius() */

    // ------------ Data------------
    webs = new websData()
    enemiesClasses = new enemiesData()
    lvlsData = new lvlsData()
    bonusClasses = new bonusData()
    cardsClasses = new cardsData()
    cardsAreasData = new cardsAreasData()

    // ------------ spider ------------
    spider = new Spider(skin9, spiderHp)

    // ------------ rendering functions ------------

    renderingWebs()
    renderingStages()
    renderingEnemies()
    renderingBonuses()
    renderingFieldsForCards()
}
function draw() {
    background(bgImage)

    // ------------ cards ------------
    for (let i = 0; i < cardsAreas.length; i++) {
        cardsAreas[i].show()
        cardsAreas[i].update()
    }

    for (let i = 0; i < floatingCards.length; i++) {
        floatingCards[i].show()
    }

    fieldForCardBackground.show()

    for (let i = 0; i < fields; i++) {
        fieldsForCards[i].show()
    }

    for (let i = 0; i < useableCards.length; i++) {
        useableCards[i].show()
    }

    for (let i = 0; i < shields.length; i++) {
        shields[i].show()
        shields[i].move()
        if (shields[i].hp <= 0) {
            shields[i].Dead()
        }
    }

    // ------------ enemies ------------
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].show()
        enemies[i].move()
        enemies[i].update()

        if (enemies[i].hp <= 0) {
            enemies[i].Dead()
        }

        for (let j = 0; j < shields.length; j++) {
            if (CollisionRectRect(shields[j], enemies[i]) && isUniqueESCombination(enemies[i].ID, shields[j].ID)) {
                enemies[i].collisionShield();
                shields[j].collisionEnemy();
                shieldEnemyCombinations.push([enemies[i].ID, shields[j].ID]);
            }
        }

        if (CollisionRectRect(spider, enemies[i])) {
            enemies[i].collisionSpider(enemies[i])
        }
    }


    // ------------ cardArea ------------
    if (currentlyDraggedCard && currentlyDraggedCard.active) {
        renderingCardsAreaRange()
    }

    //miniSpiderRadius.show()

    // ------------ hearts ------------
    let xPosOfHeart = width / 2 - skinHeart.width / 5
    let yPosOfHeart = 0

    // -- full hearts --
    for (let i = 0; i < spiderHp; i++) {
        image(skinHeart, xPosOfHeart, yPosOfHeart, skinHeart.width / 20, skinHeart.height / 20)
        xPosOfHeart += 30
    }

    // -- empty hearts --
    for (let i = 0; i < maxSpiderHp - spiderHp; i++) {
        image(skinEmptyHeart, xPosOfHeart, yPosOfHeart, skinHeart.width / 20, skinHeart.height / 20)
        xPosOfHeart += 30
    }

    // ------------ spider ------------
    spider.show()

    // ------------ webs ------------
    let theRestOfWebs = []

    for (let i = 0; i < numberOfWebs; i++) {
        webs.length = numberOfWebs
        if (webs[i].active) {
            webs[i].show()
            webs[i].moveBack()
        }

        if (!webs[i].active) {
            theRestOfWebs.push(i)
        }
    }

    // ------------ bonuses ------------
    for (let i = 0; i < bonuses.length; i++) {
        bonuses[i].show()
        bonuses[i].move()
    }

    // ------------ score ------------
    push()
    textSize(20)
    fill("black");
    text("SCORE: " + score, 20, 30)
    pop()

    // ------------ webs counter ------------
    textSize(20)
    fill("black")
    text("THE REST OF WEBS: " + theRestOfWebs.length, 200, 30)

    // ------------ level-up ------------
    if (!enemies.length && !bonuses.length) {
        if (currentStage === lvlsData.tutorial) {
            currentGroup = int(random(0, currentStage.length))
        }
        renderingEnemies()
        renderingBonuses()
    }

    // -------- miniSpiders --------

    /* for (let i = 0; i < miniSpiders.length; i++) {
        miniSpiders[i].show()
        if (miniSpiders[i].markedEnemy) {
            miniSpiders[i].move()
        }
        miniSpiders[i].update()

        for (let j = 0; j < enemies.length; j++) {
            if (CollisionRectRect(enemies[j], miniSpiders[i])) {
                enemies[j].collisionMiniSpider()
                miniSpiders[i].collisionEnemy(enemies[j])
            }
        }
    } */
}

function mousePressed() {
    web = getRandomWeb()

    for (let i = 0; i < useableCards.length; i++) {
        if (CollisionMouseRect(useableCards[i]) && activeCards.indexOf(useableCards[i].grade) === -1) {
            useableCards[i].mousePressed()
        }
    }

    if (CollisionMouseRect(fieldForCardBackground)) {
        return null;
    }

    // -- changing web --
    webs = [
        ...webs.map((item) => {
            if (web && item.ID === web.ID) {
                return {
                    ...item,
                    active: true,
                    x2: mouseX,
                    y2: mouseY,
                }
            }
            return item;
        })
    ]

    // -- Collisions --
    // - Enemies -

    for (let i = 0; i < enemies.length; i++) {
        if (web && CollisionMouseRect(enemies[i])) {
            web.collisionEnemy(enemies[i], i)
        }
    }

    // - bonuses -
    for (let i = 0; i < bonuses.length; i++) {
        if (web && CollisionMouseRect(bonuses[i])) {
            web.collisionBonus(bonuses[i])
        }
    }

    // - cards -
    for (let i = 0; i < floatingCards.length; i++) {
        if (web && CollisionMouseRect(floatingCards[i])) {
            if (useableCards.length < fields) {
                web.collisionCard(floatingCards[i], floatingCards[i].grade)
            } else {
                floatingCards[i].BlinkRed()
            }
        }
    }
}

function mouseDragged() {
    if (currentlyDraggedCard && !currentlyDraggedCard.active) {
        if (currentlyDraggedCard && activeCards.indexOf(currentlyDraggedCard.grade) === -1) {
            currentlyDraggedCard.mouseDragging()
        }
    } else {
        if (currentlyDraggedCard) {
            currentlyDraggedCard.mouseDragging()
        }
    }
}

function mouseReleased() {
    for (let i = 0; i < useableCards.length; i++) {
        if (CollisionMouseRect(useableCards[i]) && activeCards.indexOf(useableCards[i].grade) === -1) {
            useableCards[i].mouseReleased()
        }
    }
}

//--------- collision -----------
function CollisionRectRect(r1, r2) {
    if (r1.x + r1.w >= r2.x &&
        r1.x <= r2.x + r2.w &&
        r1.y + r1.h >= r2.y &&
        r1.y <= r2.y + r2.h) {
        return true
    } else {
        return false
    }
}

function CollisionRectEllipse(r, c) {
    var testX = c.x
    var testY = c.y

    if (c.x <= r.x) {
        testX = r.x
    } else if (c.x >= r.x + r.w) {
        testX = r.x + r.w
    }
    if (c.y <= r.y) {
        testY = r.y
    } else if (c.y >= r.y + r.h) {
        testY = r.y + r.h
    }

    let distance = dist(c.x, c.y, testX, testY)

    if (distance <= c.w / 2) {
        return true;
    }
    return false;

}

function CollisionMouseRect(r) {
    if (mouseX <= r.x + r.w &&
        mouseX >= r.x &&
        mouseY <= r.y + r.h &&
        mouseY >= r.y) {
        return true
    } else {
        return false
    }
}

//--------- Random f-s -----------

// -- Bonuses --
function randomBonusPositionX(w) {
    return random(-100, 0)
}

function randomBonusPositionY(h) {
    return random(-100, 0)
}

// -- Enemies --
function randomEnemyPositionX(w) {
    let rnd01 = Math.floor(Math.random() * 2)

    if (rnd01 === 0) {
        return random(w, w + 500)
    } else {
        return random(0, -500)
    }
}

function randomEnemyPositionY(h) {
    let rnd01 = Math.floor(Math.random() * 2)

    if (rnd01 === 0) {
        return random(h, h + 500)
    } else {
        return random(0, -500)
    }
}

// -- Webs --
function getRandomWeb() {
    let filterWebs = filteredWebs()
    return filterWebs[Math.floor(Math.random() * filterWebs.length)]
}

function filteredWebs() {
    return webs.filter(item => !item.active)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}