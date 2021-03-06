/**
 * Keep track of the players current score.
 * 
 * @export
 * @class ScoreKeeper
 */
export default class ScoreKeeper {
  constructor(game) {
    this.game = game;
    this._score = 0;
  }

  /**
   * Add the provided value to the current Score.
   * 
   * @param {any} points 
   * @returns 
   * @memberof ScoreKeeper
   */
  incrementScore(points = 0) {
    this._score += points;
  }

  /**
   * Getter for the current Score.
   * 
   * @returns 
   * @memberof ScoreKeeper
   */
  getScore() {
    return this._score;
  }

  /**
   * Setter for the current Score.
   * 
   * @param {any} score 
   * @memberof ScoreKeeper
   */
  setScore(score = 0) {
    this._score = score;
  }
}
