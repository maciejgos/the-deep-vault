import type { Scene } from "../game";

interface SceneViewProps {
  scene: Scene;
}

export function SceneView({ scene }: SceneViewProps) {
  return (
    <section className="scene-text" aria-labelledby="game-title">
      <p className="eyebrow">{scene.zone}</p>
      <h1 id="game-title">{scene.title}</h1>
      {scene.narrative.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

