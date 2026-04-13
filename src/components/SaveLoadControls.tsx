interface SaveLoadControlsProps {
  feedback: string;
  onNewGame: () => void;
  onSave: () => void;
  onLoad: () => void;
}

export function SaveLoadControls({ feedback, onNewGame, onSave, onLoad }: SaveLoadControlsProps) {
  return (
    <section className="save-controls" aria-label="Save controls">
      <button type="button" onClick={onNewGame}>
        New game
      </button>
      <button type="button" onClick={onSave}>
        Save
      </button>
      <button type="button" onClick={onLoad}>
        Load
      </button>
      <p role="status">{feedback}</p>
    </section>
  );
}

