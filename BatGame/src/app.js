var HelloWorldLayer = cc.Layer.extend({
  sprite: null,
  ball: null,
  ctor: function () {
    //////////////////////////////

    // 1. super init first
    this._super()

    /////////////////////////////
    // 2. add a menu item with "X" image, which is clicked to quit the program
    //    you may modify it.
    // ask the window size
    let size = cc.winSize

    for (let i = 0; i < 10; i++) {
      this.addChild(new Ball({maxXAcceleration: 10, maxYAcceleration: 8}), 0)
    }

    return true
  }
})

var HelloWorldScene = cc.Scene.extend({
  onEnter: function () {
    this._super()
    var layer = new HelloWorldLayer()
    this.addChild(layer)
  }
})

