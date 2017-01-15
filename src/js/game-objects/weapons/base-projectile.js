module.exports = BaseProjectile;

var SpriteUtils = require("../../helpers/sprite-utilities.js");

BaseProjectile.prototype = Object.create(Phaser.Sprite.prototype);

// options is an object containing some optional settings for the
// base projectile class
// - isDestructible - bool
// - rotateOnSetup - bool
// - canBurn - bool
// - canBounce - bool
// - canPierce - bool // bullets go through enemies
// - speedModifier - range (0 - 1.0)
// - tracking - bool
// - trackingTarget - (x, y) (or an object maybe, i don't really know...)
function BaseProjectile(game, x, y, key, frame, parentGroup, player, damage,
    angle, speed, range, options) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.anchor.set(0.5);
    parentGroup.add(this);

    this._player = player;
    this._enemies = game.globals.groups.enemies;
    this._damage = damage;
    this._speed = speed;
    this._range = range;
    this._initialPos = this.position.clone();
    this._remove = false; // check if BaseProjectile should be removed?

    // projectile options
    if (options !== undefined && options.isDestructible !== undefined)
        this._isDestructable = options.isDestructible;
    else this._isDestructable = true;
    if (options !== undefined && options.rotateOnSetup !== undefined)
        this._rotateOnSetup = options.rotateOnSetup;
    else this._rotateOnSetup = true;
    if (options !== undefined && options.canPierce !== undefined)
        this._canPierce = options.canPierce;
    else this._canPierce = false;
    if (options !== undefined && options.canBurn !== undefined)
        this._canBurn = options.canBurn;
    else this._canBurn = true;
    if (options !== undefined && options.canBounce !== undefined)
        this._canBounce = options.canBounce;
    else this._canBounce = true;
    if (options !== undefined && options.speedModifier !== undefined)
        this._speedModifier = options.speedModifier;
    else this._speedModifier = 1.0;
    if (options !== undefined && options.tracking !== undefined && 
            options.trackingRadius !== undefined) {
        this._tracking = options.tracking;
        this._trackingTarget = options.trackingTarget;
    } else {
        this._tracking = false;
        this._trackingTarget = null;
    }
    // If rotateOnSetup option is true, rotate projectile to face in the
    // right direction. Sprites are saved facing up (90 degrees), so we
    // need to offset the angle
    if (this._rotateOnSetup)
        this.rotation = angle + (Math.PI / 2); // Radians
    else
        this.rotation = angle;

    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.velocityFromAngle(angle * 180 / Math.PI, 
        this._speed, this.body.velocity);
    
    this.satBody = this.game.globals.plugins.satBody.addBoxBody(this)

    // Make sure the projectile isn't spawning in a wall
    SpriteUtils.satSpriteVsTilemap(this, this.game.globals.tileMapLayer, 
        this._onCollideWithMap, this, 6);
}

BaseProjectile.prototype.update = function() {
    // Collisions with the tilemap
    SpriteUtils.satSpriteVsTilemap(this, this.game.globals.tileMapLayer, 
        this._onCollideWithMap, this, 6);

    // If there is a speed modifier, apply it.
    if (this._speedModifier !== 1.0) {
        this.body.velocity.x = this.body.velocity.x * this._speedModifier;
        this.body.velocity.y = this.body.velocity.y * this._speedModifier;
    }

    // If the projectile tracks, check if target is within the tracking radius.
    // If it is, begin tracking.  Otherwise, continue on the initial
    // trajectory. NOTE(rex): HMMMM This isn't quite working...
    if (this._tracking) {
        // Was something supposed to happen here?
    }

    // If the projectile can burn, check each tile for a fire.
    // If one exists, ignore the tile and keep moving.  If there is no fire,
    // destroy the projectile and create a fire.
    if (this._canBurn && this.checkTileMapLocation(this.position.x,
        this.position.y)) {
        // this isn't working yet...
    }
}

BaseProjectile.prototype.postUpdate = function () {
    // Update arcade physics
    Phaser.Sprite.prototype.postUpdate.apply(this, arguments);
    // Check overlap
    SpriteUtils.checkOverlapWithGroup(this, this._enemies, 
        this._onCollideWithEnemy, this);
    // If projectile has collided with an enemy, or is out of range, remove it
    if ((this.position.distance(this._initialPos) >
        this._range) || (this._isDestructable && this._remove)) {
        this.destroy();
    }
};

BaseProjectile.prototype.destroy = function () {
    Phaser.Sprite.prototype.destroy.apply(this, arguments);
};

// eslint-disable-next-line no-unused-vars
BaseProjectile.prototype._onCollideWithMap = function (self, map) {
    console.log('BaseProjectile#_onCollideWithMap')
    if (self._isDestructable) {
        self._remove = true;
    }
};

BaseProjectile.prototype._onCollideWithEnemy = function (self, enemy) {
    var isKilled = enemy.takeDamage(this._damage);
    if (isKilled) this._player.incrementCombo(1);
    if (self._isDestructable && !self._canPierce) {
        self._remove = true;
    }
};

BaseProjectile.prototype.checkTileMapLocation = function(x, y) {
    var checkTile = this.game.globals.tileMap.getTileWorldXY(x, y, 36, 36,
        this.game.globals.tileMapLayer);

    if (checkTile === null || checkTile === undefined) return true;
    else return false;
}

BaseProjectile.prototype.trackTarget = function(self, target) {
    // If target is in range, calculate the acceleration based on the 
    // direction this sprite needs to travel to hit the target
    var distance = this.position.distance(target.position);
    var angle = this.position.angle(target.position);
    var targetSpeed = distance / this.game.time.physicsElapsed;
    this.body.velocity.x = targetSpeed * Math.cos(angle);
    this.body.velocity.y = targetSpeed * Math.sin(angle);
}