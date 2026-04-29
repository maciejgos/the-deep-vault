import { useMemo, useState } from "react";
import { ChoiceList } from "./components/ChoiceList";
import { EndingView } from "./components/EndingView";
import { RecordsPanel } from "./components/RecordsPanel";
import { RoutePressure } from "./components/RoutePressure";
import { SaveLoadControls } from "./components/SaveLoadControls";
import { SceneView } from "./components/SceneView";
import { StatusSummary } from "./components/StatusSummary";
import { gameContent } from "./content";
import { applyChoice, evaluateEnding, getAvailableChoices, getCurrentScene, loadGame, saveGame, startNewGame, type GameState } from "./game";

declare const __APP_VERSION__: string;

export function App() {
  const [state, setState] = useState(() => startNewGame(gameContent));
  const [feedback, setFeedback] = useState("No save loaded.");
  const scene = getCurrentScene(gameContent, state);
  const choices = getAvailableChoices(scene, state);
  const endingResult = useMemo(() => evaluateEnding(gameContent, state), [state]);

  function choose(choiceId: string) {
    const nextState = applyChoice(gameContent, state, choiceId);
    setState(nextState);
    setFeedback(summarizeConsequences(state, nextState));
  }

  function newGame() {
    setState(startNewGame(gameContent));
    setFeedback("New game started.");
    scrollToTop();
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
          <EndingView content={gameContent} endingResult={endingResult} state={state} />
        </div>
        <div className="side-panel">
          <StatusSummary state={state} />
          <RoutePressure endingResult={endingResult} />
          <SaveLoadControls feedback={feedback} onNewGame={newGame} onSave={save} onLoad={load} />
          <RecordsPanel content={gameContent} state={state} />
        </div>
      </section>
      <p className="version-badge" aria-label="Game version">
        v{__APP_VERSION__}
      </p>
    </main>
  );
}

function scrollToTop() {
  if (typeof globalThis.scrollTo !== "function") {
    return;
  }

  const scroll = () => {
    try {
      globalThis.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // Test environments may expose scrollTo without implementing it.
    }
  };

  if (typeof globalThis.requestAnimationFrame === "function") {
    globalThis.requestAnimationFrame(scroll);
    return;
  }

  scroll();
}

function summarizeConsequences(previous: GameState, next: GameState) {
  const changes = [
    delta("Stress", next.stress - previous.stress),
    delta("Supplies", next.supplies - previous.supplies),
    delta("Stability", next.publicStability - previous.publicStability),
    count("Evidence", next.evidenceIds.length - previous.evidenceIds.length),
    count("Items", next.itemIds.length - previous.itemIds.length),
    count("Codex", next.codexIds.length - previous.codexIds.length)
  ].filter(Boolean);

  if (previous.finalRoute !== next.finalRoute && next.finalRoute) {
    changes.unshift(`Route committed: ${next.finalRoute}`);
  }

  return changes.length > 0 ? changes.join(" | ") : "Choice recorded.";
}

function delta(label: string, amount: number) {
  if (amount === 0) {
    return "";
  }

  return `${label} ${amount > 0 ? "+" : ""}${amount}`;
}

function count(label: string, amount: number) {
  if (amount === 0) {
    return "";
  }

  return `${label} +${amount}`;
}
