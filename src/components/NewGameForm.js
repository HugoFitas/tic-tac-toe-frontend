import { useContext } from "react";
import { NewPlayersContext } from "../contexts/NewPlayersContext";

const NewGameForm = ({
  setIsNewGameFormVisible,
  handleChange,
  handleSubmit,
}) => {
  const { newPlayer1, newPlayer2 } = useContext(NewPlayersContext);

  const handleClick = (event) => {
    event.target.select();
  };

  return (
    <>
      <div
        className="newgame-popup-bg"
        onClick={() => setIsNewGameFormVisible(false)}
      ></div>

      <div className="newgame-popup-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="player1">Player 1</label>
          <input
            type="text"
            name="username"
            id="player1"
            value={newPlayer1.username}
            onChange={handleChange}
            onClick={handleClick}
          />
          <label htmlFor="player1">Player 2</label>
          <input
            type="text"
            name="username"
            id="player2"
            value={newPlayer2.username}
            onChange={handleChange}
            onClick={handleClick}
          />
          <button type="submit">Start new game</button>
        </form>
      </div>
    </>
  );
};

export default NewGameForm;
