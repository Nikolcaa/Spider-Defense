var currentEnemiesSpeed

function PowerOfFreezeCard(grade) {
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
            bgColor = 'grey';
            activeCards.splice(activeCards.indexOf(this.grade), 1);

            BackToNormalEnemiesSpeed()
        }, 1000)
    }
}

function PowerOfWebsComeBackCard(grade) {
    if (grade === 'websComeBackCard') {
        for (let i = 0; i < webs.length; i++) {
            if (webs[i].active) {
                webs[i].fastComeBack()
            }
        }
        activeCards.splice(activeCards.indexOf(this.grade), 1);
    }
}

function PowerOfPoisonCard(grade) {
    if (grade === 'poisonCard') {
        for (let i = 0; i < webs.length; i++) {
            if (!webs[i].active) {
                webs[i].poisoned()
            }
        }

        setTimeout(() => {
            for (let i = 0; i < webs.length; i++) {
                if(!webs[i].active){
                    webs[i].unPoisoned()
                }
            }

            activeCards.splice(activeCards.indexOf(this.grade), 1);
        }, 6000)
    }
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
            activeCards.splice(activeCards.indexOf(this.grade), 1);

            BackToNormalEnemiesSpeed()

        }, 3000)
    }

    //------------------------------------------------------------------------------------ */