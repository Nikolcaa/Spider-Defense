var currentEnemiesSpeed

function PowerOfCards(grade) {
    if (grade === 'freezeCard') {
        bgColor = 'cyan';
        enemies = [
            ...enemies.map(enemy => {
                currentEnemiesSpeed = 0
                return {
                    ...enemy,
                    speed: currentEnemiesSpeed,
                }
            })
        ]

        setTimeout(() => {
            bgColor = 'gray';
            disabledCards.splice(disabledCards.indexOf(this.grade), 1);

            BackToNormalEnemiesSpeed()

        }, 3000)
    }

    //------------------------------------------------------------------------------------

    else if (grade === 'webSpeedCard') {
        let regularWebFastComeBackSpeed = webFastComeBackSpeed
        webFastComeBackSpeed *= 2

        setTimeout(() => {
            disabledCards.splice(disabledCards.indexOf(this.grade), 1);
            webFastComeBackSpeed = regularWebFastComeBackSpeed



        }, 3000)
    }

}

function BackToNormalEnemiesSpeed() {
    Object.keys(enemiesClasses).map((cenemy, index) => {
        currentEnemiesSpeed = enemiesClasses[cenemy].speed
        enemies = [
            ...enemies.map(enemy => {
                if (enemy.grade === cenemy) {
                    return {
                        ...enemy,
                        speed: currentEnemiesSpeed
                    }
                }
                return enemy;
            })
        ]
    })
}






//-------------------- za slowe -------------------------
/*     else if (grade === 'sloweCard') {
        enemies = [
            ...enemies.map(enemy => {
                currentEnemiesSpeed = enemy.speed / 2
                return {
                    ...enemy,
                    speed: currentEnemiesSpeed
                }
            })
        ]

        setTimeout(() => {
            disabledCards.splice(disabledCards.indexOf(this.grade), 1);

            BackToNormalEnemiesSpeed()

        }, 3000)
    }

    //------------------------------------------------------------------------------------ */