import type { Choice } from "../game";

interface ChoiceListProps {
  choices: Choice[];
  onChoose: (choiceId: string) => void;
}

export function ChoiceList({ choices, onChoose }: ChoiceListProps) {
  if (choices.length === 0) {
    return <p className="empty-note">No further choices are available in this milestone build.</p>;
  }

  return (
    <nav aria-label="Available choices" className="choice-list">
      {choices.map((choice) => (
        <button key={choice.id} type="button" onClick={() => onChoose(choice.id)}>
          {choice.text}
        </button>
      ))}
    </nav>
  );
}

