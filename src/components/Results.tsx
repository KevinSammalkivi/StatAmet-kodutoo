import { UserAnswer } from '../types/quiz';
import './Results.css';

interface ResultsProps {
  answers: UserAnswer[];
  onRestart: () => void;
}

const getScoreMessage = (score: number, total: number): string => {
  const pct = score / total;
  if (pct === 1) return 'Suurepärane! Sa tunned Eesti statistikat väga hästi!';
  if (pct >= 0.8) return 'Tubli tulemus! Statistika on sinu jaoks tuttav teema.';
  if (pct >= 0.6) return 'Hea tulemus! Mõned teemad vajaksid veel uurimist.';
  if (pct >= 0.4) return 'Päris hea algus! Külasta stat.ee, et rohkem teada saada.';
  return 'Statistika maailm ootab avastamist! Uuri lähemalt stat.ee lehelt.';
};

const Results = ({ answers, onRestart }: ResultsProps) => {
  const score = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;

  return (
    <div className="results">
      <h2 className="results__title">Tulemused</h2>

      <div className="results__score" data-testid="final-score">
        <span className="results__score-number">
          {score}/{total}
        </span>
        <span className="results__score-label">punkti</span>
      </div>

      <p className="results__message" data-testid="score-message">
        {getScoreMessage(score, total)}
      </p>

      <table className="results__table" data-testid="results-table">
        <thead>
          <tr>
            <th className="results__th">#</th>
            <th className="results__th">Küsimus</th>
            <th className="results__th">Sinu vastus</th>
            <th className="results__th">Tulemus</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={answer.questionId} className="results__row">
              <td className="results__td results__td--num">{index + 1}</td>
              <td className="results__td">{answer.question}</td>
              <td className="results__td">{answer.selectedOption}</td>
              <td className="results__td">
                <span
                  className={`results__badge ${
                    answer.isCorrect
                      ? 'results__badge--correct'
                      : 'results__badge--wrong'
                  }`}
                >
                  {answer.isCorrect ? 'Õige' : 'Vale'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="results__restart"
        onClick={onRestart}
        data-testid="restart-button"
      >
        Proovi uuesti
      </button>
    </div>
  );
};

export default Results;
