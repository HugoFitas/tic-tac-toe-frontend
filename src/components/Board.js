import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NewPlayersContext } from "../contexts/NewPlayersContext";
import Square from "./Square";

const Board = ({ allUsers, setAllUsers }) => {
  const [squareValue, setSquareValue] = useState(Array(9).fill(null));

  const squares = [...Array(9).keys()];

  const { newPlayer1, setNewplayer1, newPlayer2, setNewplayer2 } =
    useContext(NewPlayersContext);

  const [xIsNext, setXIsNext] = useState(true);

  const history = useHistory();

  /* calculateWinner Function */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === "X") {
          return newPlayer1.username;
        } else {
          return newPlayer2.username;
        }
      }
    }
    return null;
  };

  const winner = calculateWinner(squareValue);

  const whichPlayer = () => {
    if (winner) {
      if (winner === newPlayer1.username) return newPlayer1;
      else return newPlayer2;
    }
  };

  const setPlayer = (setNewPlayer) => {
    if (winner) {
      if (winner === newPlayer1.username) return setNewplayer1(setNewPlayer);
      else return setNewplayer2(setNewPlayer);
    }
  };

  /* useEffect */
  useEffect(() => {
    setPlayer({
      ...whichPlayer(),
      high_score: whichPlayer() && whichPlayer().high_score + 1,
    });
  }, [winner]);

  /* handleClick function */
  const handleClick = (index) => {
    const eachSquare = squareValue.slice();
    if (calculateWinner(squareValue) || eachSquare[index]) {
      return;
    }
    eachSquare[index] = xIsNext ? "X" : "O";
    setSquareValue(eachSquare);
    setXIsNext(!xIsNext);
  };

  /* find if the winning player username is present in allUsers array */
  const winningPlayer = allUsers.find(
    (player) => player.username === (whichPlayer() && whichPlayer().username)
  );

  /* handleHomePageClick function */
  const handleHomePageClick = () => {
    if (winner) {
      if (winningPlayer === undefined) {
        axios
          .post("/users", whichPlayer())
          .then((result) => setPlayer(result.data))
          .catch((err) => alert(err));

        setAllUsers([...allUsers, whichPlayer()]);
      } else if (winningPlayer) {
        axios
          .put(`/users/${winningPlayer.id}`, whichPlayer())
          .then((result) => setPlayer(result.data))
          .catch((err) => alert(err));

        const newAllUsers = allUsers.map((player) =>
          player.id === whichPlayer().id ? whichPlayer() : player
        );
        setAllUsers(newAllUsers);
      }
    }

    history.push("/");
  };

  /* if there's a winner, a draw or still playing */
  let status;

  const squareValueNotNull = squareValue.every((item) => item !== null);

  if (winner) {
    status = <h1 className="board-h1-status">Winner is {winner}</h1>;
  } else if (!winner && squareValueNotNull) {
    status = <h1 className="board-h1-status">Draw</h1>;
  } else {
    status = (
      <h1 className="board-h1-status">
        {xIsNext ? `${newPlayer1.username}` : `${newPlayer2.username}`}'s turn
      </h1>
    );
  }

  return (
    <div>
      {status}
      <div className="board">
        {squares.map((square, index) => (
          <Square
            key={index}
            index={index}
            value={squareValue}
            handleClick={handleClick}
          />
        ))}
        <button className="board-button-homepage" onClick={handleHomePageClick}>
          Homepage
        </button>
      </div>
    </div>
  );
};

export default Board;
