export default function NextButton({
  dispatch,
  answer,
  index,
  questionLength,
}) {
  if (answer === null) return;

  if (index === questionLength - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finished
      </button>
    );
  }

  if (index < questionLength - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
}
