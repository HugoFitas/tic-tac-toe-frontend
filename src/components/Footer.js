import { useContext } from "react";
import { NewPlayersContext } from "../contexts/NewPlayersContext";

const Footer = ({ setIsNewGameFormVisible }) => {
  const { setNewplayer1, setNewplayer2 } = useContext(NewPlayersContext);

  const handleClick = () => {
    setNewplayer1({
      username: "Player 1",
      high_score: 0,
    });

    setNewplayer2({
      username: "Player 2",
      high_score: 0,
    });

    setIsNewGameFormVisible(true);
  };

  return (
    <div className="footer">
      <button onClick={handleClick}>New game</button>
    </div>
  );
};

export default Footer;
