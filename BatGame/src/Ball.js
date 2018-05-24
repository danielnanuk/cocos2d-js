let Ball = cc.Sprite.extend({
  maxXAcceleration: 0,
  maxYAcceleration: 0,
  xAcceleration: 0,
  yAcceleration: 0,
  ctor(data) {
    this._super()
    this.initWithFile(res.HelloWorld_png)
    let {maxXAcceleration = 10, maxYAcceleration = 10, scale = 0.5} = data
    this.setAnchorPoint(0, 0)
    let size = cc.winSize
    this.maxXAcceleration = maxXAcceleration
    this.maxYAcceleration = maxYAcceleration
    this.xAcceleration = Math.random() * maxXAcceleration
    this.yAcceleration = Math.random() * maxYAcceleration
    this.scale = scale
    this.x = Math.random() * (size.width - this.width * scale)
    this.y = Math.random() * (size.height - this.height * scale)
    console.log(this.x, this.y)
    this.scheduleUpdate()
  },
  update(delay) {
    let nextX = this.x + this.xAcceleration
    let nextY = this.y + this.yAcceleration
    if (nextX < 0 || nextX >= cc.winSize.width - this.width) {
      this.xAcceleration = -this.xAcceleration
      nextX = Math.sign(nextX) < 0 ? Math.abs(nextX) : 2 * (cc.winSize.width - this.width) - nextX

    }
    if (nextY < 0 || nextY > cc.winSize.height - this.width) {
      this.yAcceleration = -this.yAcceleration
      nextY =
        Math.sign(nextY) < 0 ? Math.abs(nextY) : 2 * (cc.winSize.height - this.height) - nextY
    }
    this.x = nextX
    this.y = nextY
  }
})