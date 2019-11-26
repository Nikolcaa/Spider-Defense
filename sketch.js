function setup() {
    createCanvas(window.innerWidth, window.innerHeight)


    spider = new Spider()
    enemy = new Enemy(200, 200, 20)

    for (var i = 0; i < webs.length; i++) {
        if(webs[i].active === false){
            webs[i].move()
        }
        webs[i] = new Web(webs[i].ID, webs[i].active, webs[i].x, webs[i].y, webs[i].x2, webs[i].y2, webs[i].speed)
    }
}

function draw() {
    background('grey')
    frameRate(100)

    spider.show()
    enemy.show()
    for (var i = 0; i < webs.length; i++) {
        webs[i].show()
        if(webs[i].active === false){
            webs[i].move()
        }
    }
}

var spider
var enemy
var Web = {}
var webs = [
    {
        ID: 0,
        active: true,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        x2: window.innerWidth / 2,
        y2: window.innerHeight / 2,
        speed: 5,
    },
    {
        ID: 1,
        active: true,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        x2: window.innerWidth / 2,
        y2: window.innerHeight / 2,
        speed: 5,
    },
    {
        ID: 2,
        active: true,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        x2: window.innerWidth / 2,
        y2: window.innerHeight / 2,
        speed: 5,
    },
]


function mousePressed() {
    let web = getRandomWeb()
    webs = [
        ...webs.map((item) => {
            if(item.ID === web.ID){
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
    //console.log(webs)
}


function getRandomWeb() {
    return filteredWebs()[Math.floor(Math.random() * filteredWebs().length)]
}

function filteredWebs() {
    return webs.filter((item) => {
        if (item.active) return true;
        else return false;
    })
}