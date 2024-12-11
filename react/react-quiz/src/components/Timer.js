import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  useEffect(
    function () {
      const timeId = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timeId);
    },
    [dispatch]
  );

  const mins = Math.floor(secondsRemaining / 60);
  const mins_str = mins < 9 ? "0" + mins : "" + mins;
  const secs = secondsRemaining % 60;
  const secs_str = secs < 9 ? "0" + secs : "" + secs;

  return (
    <div className="timer">
      {mins_str}:{secs_str}
    </div>
  );
}
