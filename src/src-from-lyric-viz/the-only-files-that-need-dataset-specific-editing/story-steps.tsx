import {
  addStepIndexes,
  StoryStep,
} from "../scrollytelling/scrollytelling-utils";
import {
  ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS,
  LYRIC_CLICHE_COUNT_INTEGER_FIELD,
  CONTINUOUS_FIELD,
  ID_FIELD,
  X_TEXT_EMBEDDING,
  Y_TEXT_EMBEDDING,
  SONG_AVG_CLICHENESS_CONTINUOUS_FIELD,
  SONG_TYPE_FIELD,
} from "./data-specefic-metadata";

const mapLocations = {
  overview: { x: [0, 100], y: [0, 100] },
  onMyKnees: {
    x: [47.43005995767035, 51.316108506336775],
    y: [47.358861131481135, 49.56245169473797],
  },
};

const colorEncodings = {
  lyricCliche: {
    field: LYRIC_CLICHE_COUNT_INTEGER_FIELD,
    domain: [-4, 11], // lie about lowerbound so colors fall in a easier to see range
    range: "blues", // for context, this is a D3 color set
  },
  loveSongLabel: {
    field: SONG_TYPE_FIELD,
    // domain: [0, 1], // lie about lowerbound so colors fall in a easier to see range
    range: "set1", // for context, this is a D3 color set
  },
  gender: {
    field: "gender",
    // domain: [0, 1], // lie about lowerbound so colors fall in a easier to see range
    range: "set1", // for context, this is a D3 color set
  },
  songCliche: {
    field: SONG_AVG_CLICHENESS_CONTINUOUS_FIELD,
    domain: [-4, 11], // lie about lowerbound so colors fall in a easier to see range
    range: "blues", // for context, this is a D3 color set
  },
};

const prefsUpdates = {
  noFilters: { encoding: { filter: {}, filter2: {}, jitter_radius: {} } },
  gender: { encoding: { color: colorEncodings.gender } },
  loveSongLabel: { encoding: { color: colorEncodings.loveSongLabel } },
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
      color: colorEncodings.lyricCliche,
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
  lyicClicheOverTime: {
    encoding: {
      y: {
        field: LYRIC_CLICHE_COUNT_INTEGER_FIELD,
        domain: [0, 14],
        range: [0, 100],
      },
      x: {
        field: CONTINUOUS_FIELD,
      },
      color: colorEncodings.lyricCliche,
      jitter_radius: {
        constant: 0.01,
        method: "uniform",
      },
      jitter_speed: {
        constant: 0,
      },
    },
  },
  songClicheOverTime: {
    encoding: {
      y: {
        field: SONG_AVG_CLICHENESS_CONTINUOUS_FIELD,
        domain: [0, 14],
        range: [0, 100],
      },
      x: {
        field: CONTINUOUS_FIELD,
      },
      color: colorEncodings.songCliche,
      jitter_radius: {},
      jitter_speed: {},
    },
  },
};

const labeledSteps: { [key: string]: Omit<StoryStep, "index"> } = {
  loveSongLabel: {
    content:
      "GPT3 labeled Song type: 'love', 'sex', or 'no' (aka none of those)",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.loveSongLabel,
  },
  gender: {
    content: "Gender",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.gender,
  },
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
    content:
      "Color each lyric how based on how many near neighbors it has in its higher higher dimensional embedding. A rough measure of 'cliche-ness.'",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.xyWithClicheColorEncoded,
  },
  lyicClicheOverTime: {
    content: "Now let's see how cliche individual lyrics havae been over time",
    // zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.lyicClicheOverTime,
  },
  songClicheOverTime: {
    content: "Now let's just look at the song level",
    // zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.songClicheOverTime,
  },
  timeOnTheXAndGenreBinOnY: {
    content: "Here the the X-axis is time, genre is on the Y.",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.timeOnTheXAndGenreBinOnY,
  },
};

const storySteps: Array<Omit<StoryStep, "index">> = [
  labeledSteps.loveSongLabel,
  labeledSteps.gender,
  labeledSteps.zoomedOutMap,
  labeledSteps.timeOnTheXAndGenreBinOnY,
  labeledSteps.onMyKnees,
  labeledSteps.xyWithClicheColorEncoded,
];

export default addStepIndexes(storySteps);
