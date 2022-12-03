import type { ReactNode } from "react";

export interface StoryStep {
  index: number;
  content: ReactNode;
  zoomTo?: { x: number[]; y: number[] };
  prefsUpdate?: Object;
}

export const addStepIndexes = (storySteps: Array<Omit<StoryStep, "index">>) =>
  storySteps.map((step, index) => ({ ...step, index }));
