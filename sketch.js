var webs
var enemiesDefinitions
var enemies = []

var currentLevel = 0
var lvls = [
    {
        ID: 0,
        default: 2,
        tank: 1
    },
    {
        ID: 0,
        default: 3,
        tank: 2
    },
]
var spider
var skin1, skin2, skin3, skin4, skin5, skin6, skin7, skin8, skin9

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    // ------------ Data------------
    webs = new websData()
    enemiesDefinitions = new enemiesData()

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

    // ------------ webs ------------
    for (var i = 0; i < webs.length; i++) {
        webs[i] = new Web(webs[i].ID, webs[i].active, webs[i].x, webs[i].y, webs[i].x2, webs[i].y2, webs[i].speed)
    }

    // ------------ enemies ------------

    Object.keys(enemiesDefinitions).map((grade, index) => {
        let xPos = randomEnemyPositionX(width)
        let yPos = randomEnemyPositionY(height)

        enemies.push(new Enemy(enemiesDefinitions[grade].ID, xPos, yPos, enemiesDefinitions[grade].speed, enemiesDefinitions[grade].hp, enemiesDefinitions[grade].size, enemiesDefinitions[grade].color))
        console.log(enemies)
    });

    /* 
    
        enemiesDefinitions[key] = new Enemy(enemy.ID, xPos, yPos, enemy.speed, enemy.hp, enemy.size, enemy.color) */


    // ------------ levels ------------


}

function draw() {
    background('grey')
    frameRate(120)

    // ------------ spider ------------
    spider.show()

    // ------------ webs ------------
    for (var i = 0; i < webs.length; i++) {
        webs[i].show()
        if (webs[i].active === false) {
            webs[i].move()
        }
    }

    // ------------ enemies ------------

    for(var i = 0; i < enemies.length; i++){
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

    for (var i = 0; i < enemies.length; i++) {
        for (var j = 0; j < webs.length; j++) {
            if (webs[j].collision(enemies[i])) {
                //console.log("you hit the enemy")

                //-- changing enemies --
                enemies.splice(i, 1)

                //-- changing webs --
                webs = [
                    ...webs.map((item) => {
                        if (item.ID === web.ID) {
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