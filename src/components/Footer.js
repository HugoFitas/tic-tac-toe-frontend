const Footer = ({ setIsNewGameFormVisible }) => {
  return (
    <div className="footer">
      <button onClick={() => setIsNewGameFormVisible(true)}>New game</button>
    </div>
  );
};

export default Footer;
