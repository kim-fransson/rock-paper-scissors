import logo from "../assets/logo.svg";
import CurrentScore from "./CurrentScore";

const GameHeader = () => {
  return (
    <header className="gameHeader">
      <img src={logo} alt="" className="logo" />
      <h1 className="sr-only">Rock paper scissors</h1>
      <CurrentScore />
    </header>
  );
};

export default GameHeader;
