module.exports = BasePickup;

var utils = require("../../helpers/utilities.js");

BasePickup.prototype = Object.create(Phaser.Sprite.prototype);

function BasePickup(game, x, y, key, frame, parentGroup, category, pointValue) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.anchor.set(0.5);
    parentGroup.add(this);

    this._category = category;
    this._initialPos = this.position.clone();
    this._startTime = game.time.now;
    this._pointValue = utils.default(pointValue, 0);

    // Configure physics
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.satBody = game.globals.plugins.satBody.addBoxBody(this);
}

BasePickup.prototype.killByPlayer = function () {
    this._scoreSignal.dispatch(this._pointValue);
    this.destroy();
};

BasePickup.prototype.destroy = function () {
    Phaser.Sprite.prototype.destroy.apply(this, arguments);
};
