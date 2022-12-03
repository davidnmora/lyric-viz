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
  noFilters: { encoding: { filter: {}, filter2: {} } },
  xyEncodingNoFilters: {
    encoding: {
      x: { field: X_TEXT_EMBEDDING },
      y: { field: Y_TEXT_EMBEDDING },
      filter: {},
      filter2: {},
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
  groupedByCreatorOnTheYAxis: {
    encoding: {
      y: {
        field: ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS,
      },
      x: {
        field: X_TEXT_EMBEDDING,
      },
    },
  },
  goupedByCreatorOnTheYAxisAndTimeOnX: {
    encoding: {
      y: {
        field: ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS,
      },
      x: {
        field: CONTINUOUS_FIELD,
        domain: [2019, 2023],
        range: [0, 1],
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
  groupedByCreatorOnTheYAxis: {
    content:
      "Let's group tickets into rows based on their creator, sorted low-high by most-least created",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.groupedByCreatorOnTheYAxis,
  },
  groupedByCreatorOnTheYAxisAndTimeOnX: {
    content:
      "... and now let's make the x-axis time, so we can see each ticket-creator's output over time.",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.goupedByCreatorOnTheYAxisAndTimeOnX,
  },
  zoomingIntoVelikoWorkCluster: {
    content:
      "You can see Veliko's big push of tickets regarding his Nudge Spotlight component (largely assigned to himself)",
    zoomTo: mapLocations.velikoWorkCluster,
    prefsUpdate: prefsUpdates.goupedByCreatorOnTheYAxisAndTimeOnX,
  },
  velikoLeadsExCo: {
    content:
      "... Veliko creates many tickets again as he starts leading ExCo, this time assigning them widely. #delegation",
    zoomTo: mapLocations.velikoLeadsExCo,
    prefsUpdate: prefsUpdates.goupedByCreatorOnTheYAxisAndTimeOnX,
  },
  davidLeadsPhase2: {
    content:
      "... Veliko then passes off Phase Leading to David, but still creates tickets himself for the larger exploration. #evenMoreDelegation",
    zoomTo: mapLocations.davidLeadsPhase2,
    prefsUpdate: prefsUpdates.goupedByCreatorOnTheYAxisAndTimeOnX,
  },
  zoomOut: {
    content: "Zooming out again...",
    zoomTo: mapLocations.overview,
  },
  goodbye: {
    content:
      "... and then reseting to topic groupings, we can continue to explore with filters.",
    zoomTo: mapLocations.overview,
    prefsUpdate: prefsUpdates.xyEncodingNoFilters,
  },
};

const storySteps: Array<Omit<StoryStep, "index">> = [
  labeledSteps.welcomeToTheViz,
  labeledSteps.groupedByCreatorOnTheYAxis,
  labeledSteps.groupedByCreatorOnTheYAxisAndTimeOnX,
  labeledSteps.zoomingIntoVelikoWorkCluster,
  labeledSteps.velikoLeadsExCo,
  labeledSteps.davidLeadsPhase2,
  labeledSteps.zoomOut,
  labeledSteps.goodbye,
];

export default addStepIndexes(storySteps);
