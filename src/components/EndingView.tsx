import type { EndingResult } from "../game";

interface EndingViewProps {
  endingResult: EndingResult;
}

export function EndingView({ endingResult }: EndingViewProps) {
  if (!endingResult.ending) {
    return null;
  }

  return (
    <aside className="ending-panel" aria-labelledby="ending-title">
      <p className="eyebrow">Route Preview</p>
      <h2 id="ending-title">{endingResult.ending.title}</h2>
      <p>{endingResult.ending.summary}</p>
    </aside>
  );
}

