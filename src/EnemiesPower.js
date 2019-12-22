function EnemiesPower(enemy) {
    if (enemy.grade === "AssassinBee") {
        const enemySize = enemy.w
        let d = dist(enemy.x, enemy.y, spider.x, spider.y)
        if (d <= 500 && d >= 350) {
            enemy.w = 0
            enemy.h = 0
        } else {
            enemy.w = 30
            enemy.h = 30
        }
    }
    //------------------------------------------------------------------------------------




    //------------------------------------------------------------------------------------
    else if (enemy.grade === "ShooterBee") {
        enemy.x = 100
        enemy.y = 100
        // trebalo bi da izbacuje poison
    }

}