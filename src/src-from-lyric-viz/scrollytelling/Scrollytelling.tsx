import React, { useState } from "react";
// @ts-ignore
import { Scrollama, Step } from "react-scrollama";
import type { StoryStep } from "./scrollytelling-utils";

import storySteps from "../the-only-files-that-need-dataset-specific-editing/story-steps";

const SCROLL_AREA_WIDTH = 300;

const Scrollytelling = ({
  updatePlotOnStepChange,
}: {
  updatePlotOnStepChange: any;
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data: storyStep }: { data: StoryStep }) => {
    setCurrentStepIndex(storyStep.index);
    updatePlotOnStepChange({ storyStep });
  };

  return (
    <div
      style={{
        float: "right",
        zIndex: 450,
        width: SCROLL_AREA_WIDTH,
        position: "relative",

        paddingTop: isOpen ? "25vh" : 0,
        paddingBottom: isOpen ? "25vh" : 0,

        height: isOpen ? undefined : 0,
      }}
    >
      <div style={{ position: "fixed", top: 0 }}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <b>{isOpen ? "Close" : "Open"}</b> scrollytelling guided tour
        </button>
      </div>
      <div
        style={{
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <Scrollama offset={0.5} onStepEnter={onStepEnter}>
          {storySteps.map((storyStep: StoryStep, stepIndex) => (
            <Step data={storyStep} key={stepIndex}>
              <div
                style={{
                  marginTop: "30vh",
                  marginBottom: "30vh",
                  opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                  padding: 10,
                  fontSize: 20,
                  borderRadius: 8,
                  background: "blanchedalmond",
                }}
              >
                {storyStep.content}
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
};

export default Scrollytelling;
