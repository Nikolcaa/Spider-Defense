function QueenBeeSplit(enemy) {
    if (enemy.grade === "QueenBee") {
        let xPos = enemy.x - 50
        let yPos = enemy.y + 50
        let numOfNewBees = random(1, 3)
        for (let i = 0; i < numOfNewBees; i++) {
            setTimeout(() => {
                enemies.push(new Enemy(parseInt(_.uniqueId()), xPos, yPos, enemiesClasses.Bee.speed, enemiesClasses.Bee.hp, enemiesClasses.Bee.w, enemiesClasses.Bee.h, enemiesClasses.Bee.color, enemiesClasses.Bee.grade))
                xPos += 50
                yPos -= 50
            }, 1)
        }
    }
}

function AssassinBeeInvisible(enemy){
    if (enemy.grade === "AssassinBee") {
        let d = dist(enemy.x, enemy.y, spider.x, spider.y)
        if (d <= 500 && d >= 350) {
            enemy.w = 0
            enemy.h = 0
        } else {
            enemy.w = 30
            enemy.h = 30
        }
    }
}


//------------------------------------------------------------------------------------
/* else if (enemy.grade === "ShooterBee") {
    enemy.x = 100
    enemy.y = 100
    // trebalo bi da izbacuje poison
} */
