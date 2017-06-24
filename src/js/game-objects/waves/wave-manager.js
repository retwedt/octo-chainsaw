import WaveMeter from "./wave-meter";
import GenerateLevel from "../../levels/puzzle-1";
import WaveMenu from "./wave-menu";

const colors = require("../../constants/colors");

class WaveManager {
    /**
     * Creates an instance of WaveManager.
     * @param {Phaser.Game} game 
     * @param {PickupSpawner} pickupSpawner 
     * @param {Level} level The level with wave data 
     * 
     * @memberof WaveManager
     */
    constructor(game, pickupSpawner, level) {
        this.game = game;
        this._pickupSpawner = pickupSpawner;
        this._level = level;

        // Meter for indicating which waves are coming.
        this._meter = new WaveMeter(game, this, level);
        // Menu to show wave/ammo compisition at the beginning of a wave.
        // this._menu = new WaveMenu(game, this);

        this._timer = game.time.create(false);
        this._timer.start();

        this._waves = [];
        this._totalTime = 0;
        this._currentWaveIndex = 0;

        // Subscribe to wave start events
        level.waveStartedSignal.add(this._onWaveStart, this);
    }

    _onWaveStart(waveIndex, wave) {
        // Spawn the enemies
        for (const enemyGroup of wave.enemyGroups) {
            // Enemies get a delay, but ammo does not
            const relativeMs = enemyGroup.time * 1000;
            this._timer.add(relativeMs, () => {
                enemyGroup.wave.spawn(enemyGroup.composition);
            });
        }

        // Spawn the ammo pickups
        for (const ammoDrop of wave.ammoDrops) {
            // No delay for ammo
            const relativeMs = ammoDrop.time * 1000;
            this._timer.add(relativeMs, () => {
                for (const [color, amount] of Object.entries(ammoDrop.ammo)) {
                    this._pickupSpawner.spawnPickup(color, amount);
                }
            });
        }
    }

    destroy() {
        this._timer.destroy();
    }
}

export default WaveManager;