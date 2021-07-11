import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NewPlayersContext } from "../contexts/NewPlayersContext";
import Footer from "./Footer";
import NewGameForm from "./NewGameForm";
import User from "./User";

const HighScores = ({ allUsers }) => {
  const [isNewGameFormVisible, setIsNewGameFormVisible] = useState(false);

  const { newPlayer1, setNewplayer1, newPlayer2, setNewplayer2 } =
    useContext(NewPlayersContext);

  useEffect(() => {
    allUsers.sort((a, b) =>
      a.high_score < b.high_score
        ? 1
        : a.high_score === b.high_score
        ? a.username > b.username
          ? 1
          : -1
        : -1
    );
  }, [allUsers]);

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
    /* New game form popup */
    <div className="highScores-container">
      {isNewGameFormVisible ? (
        <NewGameForm
          setIsNewGameFormVisible={setIsNewGameFormVisible}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : null}

      <h1 className="highscores-h1-title">High Scores</h1>
      <div className="highScores">
        <div className="highScores-titles">
          <h3>Position</h3>
          <h3>Player</h3>
          <h3>Score</h3>
        </div>
        {allUsers.length ? (
          <div className="users-container">
            {allUsers.slice(0, 20).map((user, index) => (
              <User key={user.id} {...user} index={index} />
            ))}
          </div>
        ) : (
          <h3 className="highscores-nousers">
            No users yet. <br /> Be the first!
          </h3>
        )}
      </div>
      <Footer setIsNewGameFormVisible={setIsNewGameFormVisible} />
    </div>
  );
};

export default HighScores;
