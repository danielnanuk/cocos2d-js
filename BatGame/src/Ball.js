let Ball = cc.Sprite.extend({
  maxXAcceleration: 0,
  maxYAcceleration: 0,
  xAcceleration: 0,
  yAcceleration: 0,
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
  created: 0,
  pR: 0,
  pG: 0,
  pB: 0,
  ctor(data) {
    this._super()
    this.initWithFile(res.bullet_png)
    let {maxXAcceleration = 10, maxYAcceleration = 10, scale = 0.5} = data
    this.maxXAcceleration = maxXAcceleration
    this.maxYAcceleration = maxYAcceleration
    this.scale = scale
    let paddingX = this.width * this.scale / 2
    let paddingY = this.height * this.scale / 2
    this.minX = paddingX
    this.minY = paddingY
    let size = cc.winSize
    this.maxX = size.width - paddingX
    this.maxY = size.height - paddingY
    this.xAcceleration = Math.random() * maxXAcceleration
    this.yAcceleration = Math.random() * maxYAcceleration
    this._randomLocation()
    this.created = new Date().getTime()
    this.scheduleUpdate()
  },
  _randomLocation() {
    this.x = this._random(this.minX, this.maxX)
    this.y = this._random(this.minY, this.maxY)
  },
  _random(from, to) {
    return Math.random() * to + from
  },
  update(delay) {
    this.changeLocation()
  },
  changeLocation() {
    let nextX = this.x + this.xAcceleration
    let nextY = this.y + this.yAcceleration

    if (nextX < this.minX) {
      this.xAcceleration = -this.xAcceleration
      nextX = 2 * this.minX - nextX
    } else if (nextX > this.maxX) {
      this.xAcceleration = -this.xAcceleration
      nextX = 2 * this.maxX - nextX
    }
    if (nextY < this.minY) {
      this.yAcceleration = -this.yAcceleration
      nextY = 2 * this.minY - nextY
    } else if (nextY > this.maxY) {
      this.yAcceleration = -this.yAcceleration
      nextY = 2 * this.maxY - nextY
    }
    this.x = nextX
    this.y = nextY
  }
})