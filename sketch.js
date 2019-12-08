var webs,
    enemiesClasses,
    enemies = [],

    lvls,
    currentLevel = 0,

    bonusClasses,
    bonuses = [],

    score = 0,
    
    heart,
    hearts = [],

    spider,
    skin1, skin2, skin3, skin4, skin5, skin6, skin7, skin8, skin9;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    // ------------ Data------------
    webs = new websData()
    enemiesClasses = new enemiesData()
    lvls = new lvlsData()
    bonusClasses = new bonusData()

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

    // ------------ spider ------------
    spider = new Spider(skin9)

    // ------------ heart ------------
    var xPosOfHeart = width/2
    var yPosOfHeart = 0
    for(let i = 0; i < 8; i++){
        heart = new Heart(xPosOfHeart, yPosOfHeart, skinHeart)
        hearts.push(heart)

        xPosOfHeart += 30
    }

    // ------------ rendering functions ------------
    renderingEnemies()
    renderingBonuses()
}

function renderingEnemies() {
    // ------------ levels ------------ // ------------ enemies ------------
    let newEnemyID = 0
    Object.keys(lvls[currentLevel]).map((classes, index) => {
        Object.keys(enemiesClasses).map((grade, index) => {
            if (classes === grade) {
                for (let i = 0; i < lvls[currentLevel][classes]; i++) {
                    let xPos = randomEnemyPositionX(width)
                    let yPos = randomEnemyPositionY(height)

                    enemies.push(new Enemy(newEnemyID, xPos, yPos, enemiesClasses[grade].speed, enemiesClasses[grade].hp, enemiesClasses[grade].size, enemiesClasses[grade].color))

                    newEnemyID += 1
                }
            }
        })
    })
}

function renderingBonuses() {
    // ------------ levels ------------ // ------------ bonuses ------------
    let newBonusID = 0
    Object.keys(lvls[currentLevel]).map((classes, index) => {
        Object.keys(bonusClasses).map((grade, index) => {
            if (classes === grade) {
                for (let i = 0; i < lvls[currentLevel][classes]; i++) {
                    let xPos = randomBonusPositionX(width)
                    let yPos = randomBonusPositionY(height)

                    bonuses.push(new Bonus(newBonusID, xPos, yPos, bonusClasses[grade].speed, bonusClasses[grade].hp, bonusClasses[grade].size, bonusClasses[grade].color))

                    newBonusID += 1
                }
            }
        })
    })
}


    // ------------ score updating ------------
function preload(){
    var scoreupdate = setInterval(function(){
        score += 1
    }, 10)
}

function draw() {
    background('grey')
    frameRate(120)

    for(let i = 0; i < hearts.length; i++){
        hearts[i].show()
    }

    // ------------ score ------------
    textSize(32)
    fill("white");
    text("SCORE: " + score, 0, 30)

    // ------------ spider ------------
    spider.show()

    // ------------ webs ------------
    for (let i = 0; i < webs.length; i++) {
        webs[i] = new Web(webs[i].ID, webs[i].active, webs[i].x, webs[i].y, webs[i].x2, webs[i].y2, webs[i].speed)
        webs[i].show()
        if (webs[i].active === false) {
            webs[i].move()
        }
    }

    // ------------ enemies ------------

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].show()
        enemies[i].move()


        if (collision(spider, enemies[i])) {
            enemies = [...enemies.filter(el => el.ID !== enemies[i].ID)];
        }
    }

    for (let i = 0; i < bonuses.length; i++) {
        bonuses[i].show()
        bonuses[i].move()
    }


    // ------------ level-up ------------
    if (!enemies.length) {
        currentLevel += 1
        renderingEnemies()
        renderingBonuses()
    }
}

function mousePressed() {
    let web = getRandomWeb()
    webs = [
        ...webs.map((item) => {
            if (web && item.ID === web.ID) {
                return {
                    ...item,
                    x2: mouseX,
                    y2: mouseY,
                    active: false
                }
            }
            return item;
        })
    ]

    for (let i = 0; i < enemies.length; i++) {
        if (mouseX <= enemies[i].x + enemies[i].size &&
            mouseX >= enemies[i].x &&
            mouseY <= enemies[i].y + enemies[i].size &&
            mouseY >= enemies[i].y) {
            if (web) {
                web.collision(enemies[i])
            }
        }
    }
}

//--------- collision -----------
function collision(player1, player2) {
    if (player1.x <= player2.x + player2.size / 2 &&
        player1.x + player1.w >= player2.x &&
        player1.y <= player2.y + player2.size / 2 &&
        player1.y + player1.h >= player2.y) {
        return true
    } else {
        return false
    }
}


//--------- Random f-s -----------

// -- Bonuses --
function randomBonusPositionX(w) {
    return random(-500, 0)
}

function randomBonusPositionY(h) {
    return random(-500, 0)
}

// -- Enemies--

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

function getRandomWeb() {
    return filteredWebs()[Math.floor(Math.random() * filteredWebs().length)]
}

function filteredWebs() {
    return webs.filter(item => item.active)
}