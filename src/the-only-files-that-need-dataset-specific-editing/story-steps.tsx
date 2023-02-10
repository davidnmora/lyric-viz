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
  overview: { x: [0, 100], y: [0, 100] },
};

const prefsUpdates = {
  noFilters: { encoding: { filter: {}, filter2: {}, jitter_radius: {} } },
  xyEncodingNoFilters: {
    encoding: {
      x: { field: X_TEXT_EMBEDDING },
      y: { field: Y_TEXT_EMBEDDING },
      filter: null,
      filter2: null,
      jitter_radius: null,
    },
  },
  // JUST FOR REFERENCE PURPOSES:
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
    content:
      "Welcome to the map: each dot is 1 of 166,000 lyric lines, arranged by topic via sentence embedding. Click a dot to open that song in YouTube.",
    // zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
  timeOnTheXAndGenreBinOnY: {
    content:
      "There are other ways to view visualize the lyrics: here the the X-axis is time, genre is on the Y.",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.timeOnTheXAndGenreBinOnY,
  },
};

const storySteps: Array<Omit<StoryStep, "index">> = [
  labeledSteps.welcomeToTheViz,
  labeledSteps.blingTown,
  // labeledSteps.feelingsFalls,
  labeledSteps.zoomBackOut,
  labeledSteps.timeOnTheXAndGenreBinOnY,
];

export default addStepIndexes(storySteps);
