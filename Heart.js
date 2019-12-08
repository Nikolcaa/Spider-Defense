function Heart(x, y, skin){
    this.x = x
    this.y = y
    this.skin = skin
    this.show = function(){
        image(skin, this.x, this.y, skin.width/20, skin.height/20)
    }
}