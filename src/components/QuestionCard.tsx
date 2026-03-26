import { useState } from "react";
import { Question } from "../types/quiz";
import "./QuestionCard.css";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number, advance: boolean) => void;
}

const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
    onAnswer(index, false);
  };

  const handleNext = () => {
    onAnswer(selectedIndex!, true);
    setSelectedIndex(null);
    setShowFeedback(false);
  };

  const isCorrect = selectedIndex === question.correctAnswer;

  return (
    <div className="question-card">
      <div className="question-card__progress">
        <span className="question-card__step">
          Küsimus {currentIndex + 1}/{totalQuestions}
        </span>
        <div className="question-card__bar">
          <div
            className="question-card__bar-fill"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="question-card__question">{question.question}</h2>

      <ul className="question-card__options">
        {question.options.map((option, index) => {
          let className = "question-card__option";
          if (showFeedback) {
            if (index === selectedIndex && index === question.correctAnswer) {
              className += " question-card__option--correct";
            } else if (index === selectedIndex) {
              className += " question-card__option--wrong";
            }
          } else if (index === selectedIndex) {
            className += " question-card__option--selected";
          }

          return (
            <li key={index}>
              <button
                className={className}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                data-testid={`option-${index}`}
              >
                <span className="question-card__option-letter">
                  {String.fromCharCode(97 + index)}
                </span>
                {option}
              </button>
            </li>
          );
        })}
      </ul>

      {showFeedback && (
        <div className="question-card__feedback" data-testid="feedback">
          <p
            className={`question-card__feedback-text ${
              isCorrect
                ? "question-card__feedback-text--correct"
                : "question-card__feedback-text--wrong"
            }`}
          >
            {isCorrect ? (
              "✓ Õige vastus!"
            ) : (
              <span>
                ✗ Vale vastus!{" "}
                <span style={{ color: "#4DC14D" }}>
                  Õige: {question.options[question.correctAnswer]}
                </span>
              </span>
            )}
          </p>
          <button
            className="question-card__next"
            onClick={handleNext}
            data-testid="next-button"
          >
            {currentIndex + 1 < totalQuestions
              ? "Järgmine küsimus"
              : "Vaata tulemusi"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
