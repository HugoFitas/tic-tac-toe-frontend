import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router-dom";
import "./reset.css";
import "./App.css";
import HighScores from "./components/HighScores";
import Board from "./components/Board";
import NewPlayersProvider from "./contexts/NewPlayersContext";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    document.title = "Tic Tac Toe";
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("/users")
      .then((response) => setAllUsers(response.data))
      .catch((err) => alert(err));
  };

  return (
    <div className="App">
      <Switch>
        <NewPlayersProvider>
          <Route
            exact
            path="/"
            render={() => <HighScores allUsers={allUsers} />}
          />
          <Route
            path="/game"
            render={() => (
              <Board allUsers={allUsers} setAllUsers={setAllUsers} />
            )}
          />
        </NewPlayersProvider>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
