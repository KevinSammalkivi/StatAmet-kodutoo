import "./StartScreen.css";

interface StartScreenProps {
  totalQuestions: number;
  onStart: () => void;
}

const StartScreen = ({ totalQuestions, onStart }: StartScreenProps) => {
  return (
    <div className="start">
      <div className="start__dots">
        <span className="start__dot" />
        <span className="start__dot" />
        <span className="start__dot" />
        <span className="start__dot" />
        <span className="start__dot" />
        <span className="start__dot" />
        <span className="start__dot" />
        <span className="start__dot" />
        <span className="start__dot" />
      </div>

      <h1 className="start__title">Eesti statistika viktoriin</h1>
      <p className="start__description">
        Testi oma teadmisi Eesti statistika kohta! Viktoriinis on{" "}
        <strong>{totalQuestions} küsimust</strong> - vali igale küsimusele õige
        vastus ja vaata, kui hästi tunned Eesti numbreid.
      </p>
      <button
        className="start__button"
        onClick={onStart}
        data-testid="start-button"
      >
        Alusta viktoriini
      </button>
    </div>
  );
};

export default StartScreen;
