function websData() {
    return [0,1,2,3,4,5,6,7,8].map((i) => {
        return {
            ID: i,
            active: false,
            x: width / 2,
            y: height / 2,
            x2: width / 2,
            y2: height / 2,
            speed: webComeBackSpeed,
            //shouldComeBack: false,
        }
    })
}
