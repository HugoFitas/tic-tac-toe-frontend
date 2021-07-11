import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { NewPlayersContext } from "../contexts/NewPlayersContext";
import Footer from "./Footer";
import NewGameForm from "./NewGameForm";
import User from "./User";

const HighScores = ({ allUsers }) => {
  const [isNewGameFormVisible, setIsNewGameFormVisible] = useState(false);

  const { newPlayer1, setNewplayer1, newPlayer2, setNewplayer2 } =
    useContext(NewPlayersContext);

  const history = useHistory();

  const handleChange = (event) => {
    const { id, name, value } = event.target;

    if (id === "player1") {
      setNewplayer1({ ...newPlayer1, [name]: value });
    } else {
      setNewplayer2({ ...newPlayer2, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPlayer1.username !== "") {
      const currentPlayer1 = allUsers.find(
        (player) => player.username === newPlayer1.username
      );

      if (currentPlayer1) {
        setNewplayer1(currentPlayer1);
      }
    }

    if (newPlayer2.username !== "") {
      const currentPlayer2 = allUsers.find(
        (player) => player.username === newPlayer2.username
      );

      if (currentPlayer2) {
        setNewplayer2(currentPlayer2);
      }
    }

    history.push("/game");
  };

  return (
    <div className="highScores-container">
      {isNewGameFormVisible ? (
        <NewGameForm
          setIsNewGameFormVisible={setIsNewGameFormVisible}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newPlayer1={newPlayer1}
          newPlayer2={newPlayer2}
        />
      ) : null}

      <h1>High Scores</h1>
      <div className="highScores">
        <div className="highScores-titles">
          <h3>Position</h3>
          <h3>Player</h3>
          <h3>Score</h3>
        </div>
        <div className="users-container">
          {allUsers.map((user, index) => (
            <User key={user.id} {...user} index={index} />
          ))}
        </div>
      </div>
      <Footer setIsNewGameFormVisible={setIsNewGameFormVisible} />
    </div>
  );
};

export default HighScores;
