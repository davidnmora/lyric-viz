import {
  addStepIndexes,
  StoryStep,
} from "../scrollytelling/scrollytelling-utils";
import {
  ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS,
  CONTINUOUS_FIELD,
  ID_FIELD,
  X_TEXT_EMBEDDING,
  Y_TEXT_EMBEDDING,
} from "./data-specefic-metadata";

const mapLocations = {
  overview: { x: [0, 1], y: [0, 1] },
  firstIssueFocus: {
    x: [0.5074450273282145, 0.594718790487779],
    y: [0.7049463248931738, 0.7728779733647674],
  },
  velikoWorkCluster: {
    x: [-0.03602058334786954, 0.33322952138025136],
    y: [-0.054196163878602266, 0.155155457998502],
  },
  velikoLeadsExCo: {
    x: [0.5575550179849789, 1.1313188969984367],
    y: [-0.08677233946584362, 0.23853128836767926],
  },
  davidLeadsPhase2: {
    x: [0.8385588678824869, 1.0517749062776807],
    y: [0.008125333957437334, 0.12901121286899825],
  },
};

const prefsUpdates = {
  noFilters: { encoding: { filter: {}, filter2: {}, jitter_radius: {} } },
  xyEncodingNoFilters: {
    encoding: {
      x: { field: X_TEXT_EMBEDDING },
      y: { field: Y_TEXT_EMBEDDING },
      filter: {},
      filter2: {},
      jitter_radius: {},
    },
  },
  justOneJiraIssue: {
    encoding: {
      filter: {
        field: ID_FIELD,
        lambda: `${ID_FIELD} => ${ID_FIELD} === "${"MDS-7"}"`,
      },
    },
  },
  timeOnTheXAndGenreBinOnY: {
    encoding: {
      y: {
        field: ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS,
      },
      x: {
        field: CONTINUOUS_FIELD,
      },
      jitter_radius: {
        constant: 0.01,
        method: "uniform",
      },
      jitter_speed: {
        constant: 0,
      },
    },
  },
};

const labeledSteps: { [key: string]: Omit<StoryStep, "index"> } = {
  welcomeToTheViz: {
    content: "Welcome to the map",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
  timeOnTheXAndGenreBinOnY: {
    content: "... and now let's make the x-axis time, genre on Y.",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.timeOnTheXAndGenreBinOnY,
  },
};

const storySteps: Array<Omit<StoryStep, "index">> = [
  labeledSteps.welcomeToTheViz,
  labeledSteps.timeOnTheXAndGenreBinOnY,
];

export default addStepIndexes(storySteps);
