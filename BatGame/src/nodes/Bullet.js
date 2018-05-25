let Bullet = cc.Sprite.extend({
  ctor({x, y}) {
    this._super(res.bullet_png)
    this.scale = 0.3
    this.x = x
    this.y = y
  }
})