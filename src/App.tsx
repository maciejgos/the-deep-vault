const openingChoices = ["Begin shift", "Read civic doctrine", "Review controls"];

export function App() {
  return (
    <main className="app-shell min-h-screen bg-neutral-950" aria-labelledby="game-title">
      <section className="scene-panel">
        <p className="eyebrow">Vault-9 / Survival Notice</p>
        <h1 id="game-title">The Deep Vault</h1>
        <p className="doctrine">Order is life. History is hazard. The surface is death.</p>
        <p>
          You are Tomas Vale, Systems Runner, Level Route 62-70. At 06:14, a coolant manifold
          bursts. By the end of shift, you will hear a voice from a level that does not exist.
        </p>
        <nav aria-label="Opening choices" className="choice-list">
          {openingChoices.map((choice) => (
            <button key={choice} type="button">
              {choice}
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}
