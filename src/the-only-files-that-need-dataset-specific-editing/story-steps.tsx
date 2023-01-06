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
  blingTown: {
    x: [0.352932844653939, 0.4166393297242866],
    y: [0.4070743109364665, 0.4431707417037659],
  },
  feelingsFalls: {
    x: [0.4575146597836081, 0.7486141162637061],
    y: [0.2681981523384174, 0.4331366411850291],
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
    content:
      "Welcome to the map: each dot is 1 of 166,000 lyric lines, arranged by topic via sentence embedding. Click a dot to open that song in YouTube.",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
  blingTown: {
    content:
      "This is Bling Town: (left to right) chains, watches, diamonds, gold, ice...",
    zoomTo: mapLocations.blingTown,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
  feelingsFalls: {
    content:
      "Less superficially, this is Feelings Falls: a cluster of emotion-related themes, cascading down till the lower center cluster typified by lyrics like 'How I feel'.",
    zoomTo: mapLocations.feelingsFalls,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
  zoomBackOut: {
    content:
      "... and we can animate these points into new arrangements as well... scroll on!",
    zoomTo: mapLocations.overview,
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
  labeledSteps.feelingsFalls,
  labeledSteps.zoomBackOut,
  labeledSteps.timeOnTheXAndGenreBinOnY,
];

export default addStepIndexes(storySteps);
