const User = ({ username, high_score, index }) => {
  return (
    <div className="user">
      <p>{index <= 9 ? `0${index + 1}` : `${index + 1}`}.</p>
      <p>{username}</p>
      <p>{high_score}</p>
    </div>
  );
};

export default User;
