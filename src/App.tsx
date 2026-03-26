import { useState } from "react";
import Logo from "./components/Logo";
import StartScreen from "./components/StartScreen";
import QuestionCard from "./components/QuestionCard";
import Results from "./components/Results";
import { questions } from "./data/questions";
import { UserAnswer } from "./types/quiz";
import "./styles/global.css";
import "./App.css";

type Screen = "start" | "quiz" | "results";

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (selectedIndex: number, advance: boolean) => {
    if (!advance) {
      const q = questions[currentQuestion];
      const userAnswer: UserAnswer = {
        questionId: q.id,
        question: q.question,
        selectedOption: q.options[selectedIndex],
        correctOption: q.options[q.correctAnswer],
        isCorrect: selectedIndex === q.correctAnswer,
      };
      setAnswers([...answers, userAnswer]);
      return;
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("results");
    }
  };

  const handleRestart = () => {
    setScreen("start");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header__logo">
          <Logo />
        </div>
        <span className="header__title">Viktoriiin</span>
      </header>

      <main className="main">
        <div className="main__inner">
          {screen === "start" && (
            <StartScreen
              totalQuestions={questions.length}
              onStart={handleStart}
            />
          )}

          {screen === "quiz" && (
            <>
              <QuestionCard
                key={questions[currentQuestion].id}
                question={questions[currentQuestion]}
                currentIndex={currentQuestion}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
              />
              <div className="main__score" data-testid="current-score">
                Skoor: {answers.filter((a) => a.isCorrect).length}/
                {answers.length}
              </div>
            </>
          )}

          {screen === "results" && (
            <Results answers={answers} onRestart={handleRestart} />
          )}
        </div>
      </main>

      <footer className="footer">
        © 2026 Statistikaamet · Viktoriinirakendus
      </footer>
    </div>
  );
}

export default App;
