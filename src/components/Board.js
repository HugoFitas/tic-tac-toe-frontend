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

  /* useEffect componentDidMount to detect reloads */
  useEffect(() => {
    /* window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    }; */
  }, []);
  const alertUser = (e) => {
    window.location.reload(history.push("/"));
  };

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

  /* useEffect */
  useEffect(() => {
    if (winner === newPlayer1.username) {
      setNewplayer1({
        ...newPlayer1,
        high_score: newPlayer1.high_score + 1,
      });
    }

    if (winner === newPlayer2.username) {
      setNewplayer2({
        ...newPlayer2,
        high_score: newPlayer2.high_score + 1,
      });
    }
  }, [winner]);

  /* find if the current player username is present in allUsers array */
  const currentPlayer1 = allUsers.find(
    (player) => player.username === newPlayer1.username
  );

  const currentPlayer2 = allUsers.find(
    (player) => player.username === newPlayer2.username
  );

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

  /* handleHomePageClick function */
  const handleHomePageClick = () => {
    if (winner) {
      if (currentPlayer1 === undefined && winner === newPlayer1.username) {
        axios
          .post("/users", newPlayer1)
          .then((result) => setNewplayer1(result.data))
          .catch((err) => alert(err));

        setAllUsers([...allUsers, newPlayer1]);
      } else if (currentPlayer1 && winner === newPlayer1.username) {
        axios
          .put(`/users/${currentPlayer1.id}`, newPlayer1)
          .then((result) => setNewplayer1(result.data))
          .catch((err) => alert(err));

        const newAllUsers = allUsers.map((player) =>
          player.id === newPlayer1.id ? newPlayer1 : player
        );
        setAllUsers(newAllUsers);
      }

      if (currentPlayer2 === undefined && winner === newPlayer2.username) {
        axios
          .post("/users", newPlayer2)
          .then((result) => setNewplayer2(result.data))
          .catch((err) => alert(err));

        setAllUsers([...allUsers, newPlayer2]);
      } else if (currentPlayer2 && winner === newPlayer2.username) {
        axios
          .put(`/users/${currentPlayer2.id}`, newPlayer2)
          .then((result) => setNewplayer2(result.data))
          .catch((err) => alert(err));

        const newAllUsers = allUsers.map((player) =>
          player.id === newPlayer2.id ? newPlayer2 : player
        );
        setAllUsers(newAllUsers);
      }
    }

    history.push("/");
  };

  /* if (winner) */
  let status;

  if (winner) {
    status = (
      <h1 className="board-h1-status">
        {winner ? `Winner is ${winner}` : null}
      </h1>
    );
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
