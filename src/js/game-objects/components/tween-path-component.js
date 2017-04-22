const TargetingComponent = require("../components/targeting-component.js");

/**
 * A component that can move a parent object along a path.
 * 
 * @class TweenPathComponent
 */
class TweenPathComponent {
    /**
     * Creates an instance of TweenPathComponent.
     * @param {any} owner An object with a position property 
     * @param {Path} path A path instance 
     * @param {number} speed Pixels per second 
     * @param {boolean} [shouldRepeat=true] Whether the tween should loop
     * @param {boolean} [shouldYoYo=true] Whether the tween should yoyo
     * 
     * @memberOf TweenPathComponent
     */
    constructor(owner, path, speed, visionRadius = 100, shouldRepeat = true, 
            shouldYoYo = true) {
        this.game = owner.game;
        this.owner = owner;
        this.speed = speed;
        this._path = path;
        this._visionRadius = visionRadius;
        this._player = this.game.globals.player;

        this._positionAlongPath = 0;
        const length = this._path.getLength();
        const duration = length / speed * 1000;
        
        this._tween = this.game.make.tween(this)
            .to({_positionAlongPath: length}, duration, "Quad.easeInOut")
            .repeatAll(shouldRepeat ? -1 : 0)
            .yoyo(shouldYoYo);
        this._firstUpdate = true;
    }

    update() {
        // Start the tween on the first update so that it doesn't run while 
        // enemies are in their "spawning" state
        if (this._firstUpdate) {
            this._tween.start();
            this._firstUpdate = false;
        }
        const point = this._path.getPointAtLength(this._positionAlongPath);
        this.owner.position.copyFrom(point);

        // Switch to chasing player if player is visible
        if (point.distance(this._player.position) <= this._visionRadius) {
            const t = new TargetingComponent(this.owner, this.speed);
            this.owner.addComponent(t);
            this.destroy();
        }
    }

    destroy() {
        this.game.tweens.remove(this._tween);
        this.owner.removeComponent(this);
    }
}

module.exports = TweenPathComponent;