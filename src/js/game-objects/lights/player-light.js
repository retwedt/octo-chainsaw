import Color from "../../helpers/color";

export default class PlayerLight {
  constructor(
    game,
    player,
    { color = 0xffffff, startRadius = 300, maxRadius = null, minRadius = 10, shrinkSpeed = 5 } = {}
  ) {
    this.game = game;
    this._player = player;
    this._radius = startRadius;
    this._maxRadius = maxRadius !== null ? maxRadius : startRadius;
    this._minRadius = minRadius;
    this._shrinkSpeed = shrinkSpeed;
    this._color = color instanceof Color ? color : new Color(color);

    this._lighting = game.globals.plugins.lighting;
    this._light = this._lighting.addLight(
      new Phaser.Point(0, 0),
      new Phaser.Circle(0, 0, 2 * this._radius),
      color,
      color
    );
  }

  getRadius() {
    return this._radius;
  }

  getLightRemaining() {
    return (this._radius - this._minRadius) / (this._maxRadius - this._minRadius);
  }

  centerOnPlayer() {
    this._light.position.copyFrom(this._player.position);
  }

  incrementRadius(dRadius) {
    this.updateRadius(this._radius + dRadius);
  }

  updateRadius(newRadius) {
    if (newRadius > this._maxRadius) newRadius = this._maxRadius;
    else if (newRadius < this._minRadius) newRadius = this._minRadius;
    this._radius = newRadius;
  }

  update() {
    this.incrementRadius(-this._shrinkSpeed * this.game.time.physicsElapsed);
    this._light.setShape(new Phaser.Circle(0, 0, 2 * this._radius));
  }

  isPointInShadow(point) {
    return !this._light.isPointInLight(point);
  }

  destroy() {
    this._game = null;
    this._light.destroy();
  }
}
