var webs,
    enemiesClasses,
    enemies = [],

    lvls,
    currentLevel = {},

    spider,
    skin1, skin2, skin3, skin4, skin5, skin6, skin7, skin8, skin9;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    // ------------ Data------------
    webs = new websData()
    enemiesClasses = new enemiesData()
    lvls = new lvls()

    // ------------ skins ------------
    skin1 = loadImage('imagesOfSpider/spider1.png')
    skin2 = loadImage('imagesOfSpider/spider2.png')
    skin3 = loadImage('imagesOfSpider/spider3.png')
    skin4 = loadImage('imagesOfSpider/spider4.png')
    skin5 = loadImage('imagesOfSpider/spider5.png')
    skin6 = loadImage('imagesOfSpider/spider6.png')
    skin7 = loadImage('imagesOfSpider/spider7.png')
    skin8 = loadImage('imagesOfSpider/spider8.png')
    skin9 = loadImage('imagesOfSpider/spider9.png')

    // ------------ spider ------------
    spider = new Spider(skin9)

    // ------------ levels ------------
    var newEnemyID = 0
    Object.keys(lvls[0]).map((classes, index) => {
        Object.keys(enemiesClasses).map((grade, index) => {
            if (classes === grade) {
                for (let i = 0; i < lvls[0][classes]; i++) {
                    let xPos = randomEnemyPositionX(width)
                    let yPos = randomEnemyPositionY(height)

                    enemies.push(new Enemy(newEnemyID, xPos, yPos, enemiesClasses[grade].speed, enemiesClasses[grade].hp, enemiesClasses[grade].size, enemiesClasses[grade].color))
    
                    newEnemyID += 1
                }
            }
        })

    })

    // ------------ enemies ------------





}

function draw() {
    background('grey')
    frameRate(120)

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

        spider.collision(enemies[i])
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
//--------- Random f-s -----------

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