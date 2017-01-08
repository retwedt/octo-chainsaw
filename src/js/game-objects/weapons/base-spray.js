module.exports = SprayProjectile;

var SpriteUtils = require("../../helpers/sprite-utilities.js");
var BaseProjectile = require("./base-projectile.js");

SprayProjectile.prototype = Object.create(BaseProjectile.prototype);

function SprayProjectile(game, x, y, key, frame, parentGroup, player, damage,
    angle, speed, life, options) {
    // Set an arbitrary max range, this shouldn't come up
    // because of the age limit though
    BaseProjectile.call(this, game, x, y, key, frame, parentGroup, player, 
        damage, angle, speed, 100, options);

    this._age = 0;
    this._life = life;

    // projectile options
    if (options !== undefined && options.sizeModifier !== undefined)
        this._sizeModifier = options.sizeModifier;
    else this._sizeModifier = 1.0;
    if (options !== undefined && options.initialSize !== undefined)
        this._initialSize = options.initialSize;
    else this._initialSize = 1.0;
    if (options !== undefined && options.maxSize !== undefined)
        this._maxSize = options.maxSize;
    else this._maxSize = 1.0;

    // Set intial scale
    this.scale.setTo(this._initialSize, this._initialSize);
    // Error checking, you can't have a different min and max size
    // if the size modifier is 0...
    if (this._initialSize !== this._maxSize && this.sizeModifier === 1.0) {
        this._maxSize = this._initialSize
    }
}

SprayProjectile.prototype.update = function() {
    // Update the age counter of the spray
    this._age++;

    // If the size modifier is set, apply it as well.
    if (this._sizeModifier !== 1.0 && this.scale.x < this._maxSize) {
        var x = this.scale.x * this._sizeModifier; // 1.0264
        var y = this.scale.y * this._sizeModifier; // 1.0264
        this.scale.setTo(x, y);
    }
    BaseProjectile.prototype.update.apply(this, arguments);
}

SprayProjectile.prototype.postUpdate = function () {
    // Update arcade physics
    BaseProjectile.prototype.postUpdate.apply(this, arguments);
    if ((this._age > this._life)) {
        this.destroy();
    }
};

SprayProjectile.prototype.destroy = function () {
    BaseProjectile.prototype.destroy.apply(this, arguments);
};
