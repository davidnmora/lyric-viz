import {
  addStepIndexes,
  StoryStep,
} from "../scrollytelling/scrollytelling-utils";
import {
  ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS,
  CLICHE_CONTINUOUS_FIELD,
  CONTINUOUS_FIELD,
  ID_FIELD,
  X_TEXT_EMBEDDING,
  Y_TEXT_EMBEDDING,
} from "./data-specefic-metadata";

const mapLocations = {
  overview: { x: [0, 100], y: [0, 100] },
  onMyKnees: {
    x: [47.43005995767035, 51.316108506336775],
    y: [47.358861131481135, 49.56245169473797],
  },
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
  xyWithClicheColorEncoded: {
    encoding: {
      x: { field: X_TEXT_EMBEDDING },
      y: { field: Y_TEXT_EMBEDDING },
      color: {
        field: CLICHE_CONTINUOUS_FIELD,
        domain: [-4, 14], // lie about lowerbound so colors fall in a easier to see range
        range: "blues", // for context, this is a D3 color set
      },
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
  zoomedOutMap: {
    content:
      "Welcome to the map: each dot is 1 of 166,000 lyric lines, arranged by topic via sentence embedding. Click a dot to view the cliche's for the song.",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
  onMyKnees: {
    content:
      "Some cliche's are quite clear: like 'I'm no my knees', frequently rhymed with 'please'",
    zoomTo: mapLocations.onMyKnees,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
  xyWithClicheColorEncoded: {
    content: "Color each lyric by how cliche it is",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.xyWithClicheColorEncoded,
  },
  // timeOnTheXAndGenreBinOnY: {
  //   content:
  //     "There are other ways to view visualize the lyrics: here the the X-axis is time, genre is on the Y.",
  //   zoomTo: mapLocations.overview,
  //   prefsUpdate: prefsUpdates.timeOnTheXAndGenreBinOnY,
  // },
};

const storySteps: Array<Omit<StoryStep, "index">> = [
  labeledSteps.zoomedOutMap,
  labeledSteps.onMyKnees,
  labeledSteps.xyWithClicheColorEncoded,
  labeledSteps.lyicClicheOverTime,
  labeledSteps.songClicheOverTime,
  // labeledSteps.timeOnTheXAndGenreBinOnY,
];

export default addStepIndexes(storySteps);
