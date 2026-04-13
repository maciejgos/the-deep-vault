import { useMemo, useState } from "react";
import { ChoiceList } from "./components/ChoiceList";
import { EndingView } from "./components/EndingView";
import { RecordsPanel } from "./components/RecordsPanel";
import { SaveLoadControls } from "./components/SaveLoadControls";
import { SceneView } from "./components/SceneView";
import { StatusSummary } from "./components/StatusSummary";
import { gameContent } from "./content";
import { applyChoice, evaluateEnding, getAvailableChoices, getCurrentScene, loadGame, saveGame, startNewGame } from "./game";

export function App() {
  const [state, setState] = useState(() => startNewGame(gameContent));
  const [feedback, setFeedback] = useState("No save loaded.");
  const scene = getCurrentScene(gameContent, state);
  const choices = getAvailableChoices(scene, state);
  const endingResult = useMemo(() => evaluateEnding(gameContent, state), [state]);

  function choose(choiceId: string) {
    setState((currentState) => applyChoice(gameContent, currentState, choiceId));
    setFeedback("Choice recorded.");
  }

  function newGame() {
    setState(startNewGame(gameContent));
    setFeedback("New game started.");
  }

  function save() {
    const result = saveGame(state);
    if (result.ok) {
      setState(result.state);
      setFeedback("Game saved.");
      return;
    }

    setFeedback(result.message);
  }

  function load() {
    const result = loadGame();
    if (result.ok) {
      setState(result.state);
      setFeedback("Game loaded.");
      return;
    }

    setFeedback(result.message);
  }

  return (
    <main className="app-shell min-h-screen bg-neutral-950" aria-labelledby="game-title">
      <section className="play-surface">
        <div className="scene-panel">
          <SceneView scene={scene} />
          <ChoiceList choices={choices} onChoose={choose} />
          <EndingView endingResult={endingResult} />
        </div>
        <div className="side-panel">
          <StatusSummary state={state} />
          <RecordsPanel content={gameContent} state={state} />
          <SaveLoadControls feedback={feedback} onNewGame={newGame} onSave={save} onLoad={load} />
        </div>
      </section>
    </main>
  );
}
