import { useEffect, useReducer } from "react";
import Timer from "./Timer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import Question from "./Question.js";
import StartScreen from "./StartScreen.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishedScreen from "./FinishedScreen.js";
import Footer from "./Footer.js";

const SECS_PEr_QUESITON = 30;

const initalState = {
  questions: [],
  // "loading", "error", "ready", "activate"
  status: "loading",
  index: 0,

  answer: null,
  score: 0,
  highScore: 0,

  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PEr_QUESITON,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        score:
          question.correctOption === action.payload
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restart":
      return {
        ...initalState,
        question: state.question,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, score, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);
  const questionLength = questions.length;
  const maxPossibleScore = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={questionLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionLength={questionLength}
              score={score}
              maxPossibleScore={maxPossibleScore}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              score={score}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionLength={questionLength}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            score={score}
            maxPossibleScore={maxPossibleScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
