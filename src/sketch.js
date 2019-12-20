var webs,
    webFastComeBackSpeed = 8,
    webComeBackSpeed = 2,
    numberOfWebs = 8,

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
    disabledCards = [],

    fields = 20,
    fieldsForCards = [],
    cardsPower,

    spider,
    spiderHp = 400,
    maxSpiderHp = 8,
    skin1, skin2, skin3, skin4, skin5, skin6, skin7, skin8, skin9,

    bgColor = 'gray';

// ---------------- render functions -----------------
function renderingStages() {
    // if (score === toliko) {
    currentStage = lvlsData.tutorial
    //} else {
    //currentStage = lvlsData.stage2
    //}
}

function renderingEnemies() {
    // -- levels --  -- enemies --
    Object.keys(currentStage[currentGroup]).map((classes, index) => {
        Object.keys(enemiesClasses).map((grade, key) => {
            if (classes === grade) {
                for (let i = 0; i < currentStage[currentGroup][classes]; i++) {
                    let xPos = randomEnemyPositionX(width)
                    let yPos = randomEnemyPositionY(height)

                    enemies.push(new Enemy(parseInt(_.uniqueId()), xPos, yPos, enemiesClasses[grade].speed, enemiesClasses[grade].hp, enemiesClasses[grade].w, enemiesClasses[grade].h, enemiesClasses[grade].color, enemiesClasses[grade].grade))
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

                    bonuses.push(new Bonus(parseInt(_.uniqueId()), xPos, yPos, bonusClasses[grade].img, bonusClasses[grade].speed, bonusClasses[grade].hp, bonusClasses[grade].w, bonusClasses[grade].h, bonusClasses[grade].drop))
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
            setTimeout(function () {
                floatingCards.push(new FloatingCard(parseInt(_.uniqueId()), cardsClasses[classes].img, cardsClasses[classes].img.width, cardsClasses[classes].img.height, xPos, yPos, classes))
            }, 1)
        }
    })
}

function renderingCardsCollection() {
    let widthOfCard = 70
    let heightOfCard = 80
    let yPos = fieldsForCards[0].y
    let xPos = fieldsForCards[0].x

    useableCards = [];

    for (let i = 0; i < cardsCollection.length; i++) {
        useableCards.push(new UseableCard(
            ...Object.values(cardsCollection[i]),
            xPos,
            yPos
        ))
        xPos += 72
    }
}

function renderingFieldsForCards() {
    let w = 70 + 2
    let h = 80 + 2
    let yPos = height - h;
    let xPos = (width - w * fields) / 2;

    for (let i = 0; i < fields; i++) {
        fieldsForCards.push(new FieldForCard(xPos, yPos, w, h))
        xPos += w
    }
}

function preload() {

    // ------------ skins ------------
    // spider
    skin1 = loadImage('imagesOfSpider/spider1.png')
    skin2 = loadImage('imagesOfSpider/spider2.png')
    skin3 = loadImage('imagesOfSpider/spider3.png')
    skin4 = loadImage('imagesOfSpider/spider4.png')
    skin5 = loadImage('imagesOfSpider/spider5.png')
    skin6 = loadImage('imagesOfSpider/spider6.png')
    skin7 = loadImage('imagesOfSpider/spider7.png')
    skin8 = loadImage('imagesOfSpider/spider8.png')
    skin9 = loadImage('imagesOfSpider/spider9.png')

    // heart
    skinHeart = loadImage('imagesOfHeart/heart.png')
    skinEmptyHeart = loadImage('imagesOfHeart/emptyHeart.png')

    // bonuses
    skinFreezeBonus = loadImage('imagesOfBonuses/freezeBonus.png')
    skinWebsComeBackBonus = loadImage('imagesOfBonuses/sloweBonus.png')

    // cards
    skinFreezeCard = loadImage('imagesOfCards/freezeCard.png')
    skinWebsComeBackCard = loadImage('imagesOfCards/sloweCard.png')


    // -- score updating --
    var scoreupdate = setInterval(function () {
        score += 1
    }, 1000)
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    // ------------ Data------------
    webs = new websData()
    enemiesClasses = new enemiesData()
    lvlsData = new lvlsData()
    bonusClasses = new bonusData()
    cardsClasses = new cardsData()

    // ------------ spider ------------
    spider = new Spider(skin9, spiderHp)

    // ------------ rendering functions ------------

    renderingStages()
    renderingEnemies()
    renderingBonuses()

    renderingFieldsForCards()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(bgColor)

    // ------------ score ------------
    textSize(20)
    fill("white");
    text("SCORE: " + score, 20, 30)




    // ------------ hearts ------------
    var xPosOfHeart = width / 2 - skinHeart.width / 5
    var yPosOfHeart = 0

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
        webs[i] = new Web(webs[i].ID, webs[i].active, webs[i].x, webs[i].y, webs[i].x2, webs[i].y2, webs[i].speed)
        webs[i].show()
        webs[i].move()
        if(!webs[i].active){
            theRestOfWebs.push(i)
        }
    }

    // ------------ counter of webs ------------
    textSize(20)
    fill("white")
    text("THE REST OF WEBS: " + theRestOfWebs.length, 200, 30)



    // ------------ enemies ------------
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].show()
        enemies[i].move()

        if (Collision(spider, enemies[i])) {
            enemies[i].collisionSpider(enemies[i])
        }
    }

    // ------------ bonuses ------------
    for (let i = 0; i < bonuses.length; i++) {
        bonuses[i].show()
        bonuses[i].move()
    }

    // ------------ cards ------------
    for (let i = 0; i < fields; i++) {
        fieldsForCards[i].show()
    }

    for (let i = 0; i < floatingCards.length; i++) {
        floatingCards[i].show()
    }

    for (let i = 0; i < useableCards.length; i++) {
        useableCards[i].show()
    }

    // ------------ level-up ------------
    if (!enemies.length && !bonuses.length) {
        if (currentStage === lvlsData.tutorial) {

            currentGroup += 1
        }/*  else {
                currentGroup = int(random(0, currentStage.length))
            } */
        renderingEnemies()
        renderingBonuses()
    }
}

function mousePressed() {
    for (let j = 0; j < fieldsForCards.length; j++) {
        if (MouseCollision(fieldsForCards[j])) {
            for (let i = 0; i < useableCards.length; i++) {
                if (MouseCollision(useableCards[i]) && disabledCards.indexOf(useableCards[i].grade) === -1) {
                    useableCards[i].mouseCollision(useableCards[i])
                    break;
                }
            }
            return null;
        }
    }

    let web = getRandomWeb()

    // -- changing web --
    webs = [
        ...webs.map((item) => {
            if (web && item.ID === web.ID) {
                return {
                    ...item,
                    x2: mouseX,
                    y2: mouseY,
                    active: true
                }
            }
            return item;
        })
    ]

    // -- Collisions --
    // - Enemies -
    for (let i = 0; i < enemies.length; i++) {
        if (web && MouseCollision(enemies[i])) {
            web.collisionEnemy(enemies[i], i)
        }
    }

    // - bonuses -
    for (let i = 0; i < bonuses.length; i++) {
        if (web && MouseCollision(bonuses[i])) {
            renderingFloatingCards(bonuses[i])
            web.collisionBonus(bonuses[i])
        }
    }

    // - cards -
    for (let i = 0; i < floatingCards.length; i++) {
        if (web && MouseCollision(floatingCards[i])) {
            web.collisionCard(floatingCards[i], floatingCards[i].grade)
        }
    }
}

//--------- collision -----------
function Collision(player1, player2) {
    if (player1.x <= player2.x + player2.w / 2 &&
        player1.x + player1.w >= player2.x &&
        player1.y <= player2.y + player2.h / 2 &&
        player1.y + player1.h >= player2.y) {
        return true
    } else {
        return false
    }
}

function MouseCollision(player2) {
    if (mouseX <= player2.x + player2.w &&
        mouseX >= player2.x &&
        mouseY <= player2.y + player2.h &&
        mouseY >= player2.y) {
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
    return filteredWebs()[Math.floor(Math.random() * filteredWebs().length)]
}

function filteredWebs() {
    return webs.filter(item => !item.active) 
}