export default function FinishedScreen({
  score,
  maxPossibleScore,
  highScore,
  dispatch,
}) {
  const percentage = (score / maxPossibleScore) * 100;
  return (
    <>
      <p className="result">
        <span>
          You scored <strong>{score}</strong> out of {maxPossibleScore}{" "}
          {Math.ceil(percentage)} %
        </span>
      </p>
      <p className="highscore">Highscore: {highScore} points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
