import GameEngine from "../src/model/GameEngine";
import "mocha";

describe("Basic Game Tests", () => {
  const game = new GameEngine();
  console.log(game.getState());
  game.left();
  console.log(game.getState());
});
