let Hero = cc.Sprite.extend({
  _animation: null,
  ctor() {
    this._super('res/hero/fly_0001.png')
    this._animation = new cc.Animation()
    for (let i = 1; i <= 20; i++) {
      let file = `res/hero/fly_00${i < 10 ? '0' + i : i}.png`
      this._animation.addSpriteFrameWithFile(file)
    }
    this._animation.setDelayPerUnit(1 / 20)
    let action = cc.animate(this._animation).repeatForever()
    this.runAction(action)
    this._animation.retain()
    return true
  },
  onExit(){
    this._super()
    this._animation.release()
  }
})