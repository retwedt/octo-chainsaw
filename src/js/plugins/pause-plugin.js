/**
 * A plugin that provides an alternate to the default Phaser pausing functionality. Instead of 
 * pausing everything, this system can selectively pause certain elements.
 * 
 * @class PausePlugin
 * @extends {Phaser.Plugin}
 */
class PausePlugin extends Phaser.Plugin {
    /**
     * Creates an instance of PausePlugin.
     * @param {Phaser.Game} game 
     * @param {Phaser.PluginManager} manager 
     * 
     * @memberOf PausePlugin
     */
    constructor(game, manager) {
        super(game, manager);
        this.game = game;
        this._pluginManager = manager;
        this._paused = false;
        this._pausableGroups = [];
        this._pausableIndividuals = [];
        this._timers = [];
        this._tweens = [];
    }

    // Animations = linked to sprite/group
    // Input = linked to sprite/group
    // Sounds = NOT linked
    // Tweens = NOT directly linked
    // Timer = NOT directly linked

    register(...objects) {
        for (const obj of objects) {
            if (obj instanceof Phaser.Group) {
                this._pausableGroups.push(obj);
            } else if (obj instanceof Phaser.Sprite) {
                this._pausableIndividuals.push(obj);
            } else if (obj instanceof Phaser.Timer) {
                this._timers.push(obj);
            } else if (obj instanceof Phaser.Tween) {
                this._tweens.push(obj);
            } else {
                console.warn("Unsupported type!");
            }
        }
    }

    set paused(pauseState) {
        if (pauseState !== this._paused) {
            this._paused = pauseState;
            this._pauseStateChanged();
        }
    }

    get paused() {
        return this._paused;
    }

    _pauseStateChanged() {
        for (const group of this._pausableGroups) {
            this._updateAnimationsGroup(group);
        }
        for (const individual of this._pausableIndividuals) {
            this._updateAnimationsIndividual(individual);
        }
        for (const timer of this._timers) {
            if (this._paused) timer.pause();
            else timer.resume();
        }
        for (const tween of this._tweens) {
            if (this._paused) tween.pause();
            else tween.resume();
        }
    }

    _updateAnimations(object) {
        if (object instanceof Phaser.Group) this._updateAnimationsGroup(object);
        else this._updateAnimationsIndividual(object);
    }
    _updateAnimationsGroup(group) {
        for (const child of group.children) this._updateAnimations(child);
    }
    _updateAnimationsIndividual(individual) {
        if (individual.animations && individual.animations.currentAnim) {
            individual.animations.currentAnim.paused = this._paused;
        }
    }
    
}

module.exports = PausePlugin;