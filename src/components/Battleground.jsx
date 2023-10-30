import { Component } from "react";

import GameLoop from "./GameLoop";

class Battleground extends Component {
  render() {
    return (
      <div className="container">
        <GameLoop />
        <div className="gambit-container">
          <div className="gambit">
            <label htmlFor="subject0">If</label>
            <select name="gambits" id="subject0">
              <option value="player">Player</option>
              <option value="enemy">Enemy</option>
            </select>

            <label htmlFor="condition0">has</label>
            <select name="gambits" id="condition0">
              <option value="HP > 50%">{"HP > 50%"}</option>
              <option value="HP = 100%">{"HP = 100%"}</option>
            </select>

            <label htmlFor="action0">he</label>
            <select name="gambits" id="action0">
              <option value="attack">Attack</option>
              <option value="defend">Defend</option>
              <option value="heal">Heal</option>
            </select>

            <label htmlFor="target0">this target</label>
            <select name="gambits" id="target0">
              <option value="player">Player</option>
              <option value="enemy">Enemy</option>
            </select>
          </div>

          <div className="gambit">
            <label htmlFor="subject1">If</label>
            <select name="gambits" id="subject1">
              <option value="player">Player</option>
              <option value="enemy">Enemy</option>
            </select>
            <label htmlFor="condition1">has</label>
            <select name="gambits" id="condition1">
              <option value="HP > 50%">{"HP > 50%"}</option>
              <option value="HP = 100%">{"HP = 100%"}</option>
            </select>

            <label htmlFor="action1">he</label>
            <select name="gambits" id="action1">
              <option value="attack">Attack</option>
              <option value="defend">Defend</option>
              <option value="heal">Heal</option>
            </select>

            <label htmlFor="target1">this target</label>
            <select name="gambits" id="target1">
              <option value="player">Player</option>
              <option value="enemy">Enemy</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Battleground;
