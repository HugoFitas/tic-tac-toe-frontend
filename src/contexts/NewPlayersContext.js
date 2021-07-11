import { createContext, useState } from "react";

export const NewPlayersContext = createContext(null);

const NewPlayersProvider = (props) => {
  const [newPlayer1, setNewplayer1] = useState({
    username: "Player 1",
    high_score: 0,
  });

  const [newPlayer2, setNewplayer2] = useState({
    username: "Player 2",
    high_score: 0,
  });

  return (
    <NewPlayersContext.Provider
      value={{ newPlayer1, setNewplayer1, newPlayer2, setNewplayer2 }}
    >
      {props.children}
    </NewPlayersContext.Provider>
  );
};

export default NewPlayersProvider;
