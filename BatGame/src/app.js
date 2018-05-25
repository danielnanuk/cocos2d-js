var HelloWorldLayer = cc.Layer.extend({
  _touchY: null,
  _hero: null,
  _bullets: [],
  _monsters: [],
  _score: 0,
  scoreLabel:null,
  ctor () {
    this._super()
    let hero = new Hero()
    hero.x = -153 / 2
    hero.y = cc.winSize.height / 2
    this.scoreLabel = new cc.LabelTTF('Score: 0', null, 26)
    this.addChild(this.scoreLabel)
    this.scoreLabel.x = 60
    this.scoreLabel.y = cc.winSize.height - 40
    this.addChild(hero, 0)
    let move = cc.moveTo(2, cc.p(hero.x + 170, hero.y)).easing(cc.easeOut(0.5))
    hero.runAction(move)
    this._hero = hero
    if ('touches' in cc.sys.capabilities) {
      cc.eventManager.addListener(
        {event: cc.EventListener.TOUCH_ALL_AT_ONCE, onTouchesMoved: this._onTouchMoved.bind(this)},
        this)
    } else {
      cc.eventManager.addListener(
        {event: cc.EventListener.MOUSE, onMouseMove: this._onMouseMove.bind(this)}, this)
    }

    // use space to fire
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyReleased: (keyCode) => {
        if (keyCode === cc.KEY.space) {
          this.fire()
        }
      }
    }, this)

    // use mouse click to fire
    cc.eventManager.addListener({
      event: cc.EventListener.MOUSE,
      onMouseDown: (keyCode) => {
        if (keyCode._button === cc.EventMouse.BUTTON_LEFT) {
          this.fire()
        }
      }
    }, this)

    this.scheduleUpdate()
    this.schedule(this.monsterGenerator, 1, cc.REPEAT_FOREVER, 0, 'monsterGenerator')
    return true
  },
  _onTouchMoved: function (touches, event) {
    this._touchY = touches[0].getLocation().y
  },

  _onMouseMove: function (event) {
    this._touchY = event.getLocationY()
  },
  removeBullet(i){
    this.removeChild(this._bullets[i])
    this._bullets.splice(i, 1)
  },
  removeMonster(i) {
    let monster = this._monsters[i]
    monster.runAction(cc.spawn(
      cc.fadeOut(0.5),
      cc.callFunc(() => {
        this.removeChild(monster)
      })
    ))
    this._monsters.splice(i, 1)
  },
  update(delay) {
    if (this._touchY) {
      this._hero.y -= (this._hero.y - this._touchY) * 0.1
    }

    for (let i = 0; i < this._bullets.length; i++) {
      let bullet = this._bullets[i]
      if (bullet.x >= cc.winSize.width + bullet.width) {
        this.removeBullet(i)
        return
      }

      for (let j = 0; j < this._monsters.length; j++) {
        let monster = this._monsters[j]
        if (cc.rectIntersectsRect(bullet, monster)) {
          this.removeBullet(i)
          this.removeMonster(j)
          this._score++
          this.scoreLabel.setString(`Score: ${this._score}`)
        }
      }

    }
  },
  fire(){
    let y = this._hero.y
    let x = this._hero.x + 100
    let bullet = new Bullet({x, y})
    this.addChild(bullet, 0)
    this._bullets.push(bullet)
    let moveTo = cc.moveTo(1, cc.winSize.width + bullet.width, y).easing(
      cc.easeExponentialOut())
    bullet.runAction(moveTo)
  },
  monsterGenerator() {
    if (Math.random() < 0.9 && this._monsters.length === 0) {
      let monster = new cc.Sprite(res.monster_png)
      monster.x = cc.winSize.width - 88
      monster.y = Math.random() * (cc.winSize.height - monster.height) + monster.height / 2
      window.monster = monster
      this._monsters.push(monster)
      this.addChild(monster, 0)
    }
  }
})

let HelloWorldScene = cc.Scene.extend({
  onEnter: function () {
    this._super()
    let layer = new HelloWorldLayer()
    this.addChild(layer)
  }
})

