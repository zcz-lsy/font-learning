export default function Progress({
  index,
  questionLength,
  score,
  maxPossibleScore,
  answer,
}) {
  return (
    <div>
      <header className="progress">
        <progress
          max={questionLength}
          value={index + Number(answer !== null)}
        />
        <p>
          Question <strong>{index + 1}</strong> / {questionLength}
        </p>
        <p>
          <strong>{score}</strong> / {maxPossibleScore}
        </p>
      </header>
    </div>
  );
}
