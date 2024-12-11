import Options from "./Options";

export default function Question({ question, answer, dispatch, score }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        answer={answer}
        dispatch={dispatch}
        score={score}
      />
    </div>
  );
}
