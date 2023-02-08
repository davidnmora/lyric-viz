import { Labels } from "../components/deepscatter/DeepScatterWrapper";
// type Level = 1 | 2 | 3;
type RawLabel = {
  label: string;
  level?: number;
  nearestLyric: string;
  coordinates: Array<Number>;
  children?: Array<RawLabel>;
};

const RAW_LABELS_NOT_IN_GEOJSON_FORM: Array<RawLabel> = [
  {
    label: "Love Lagoon",
    nearestLyric: "Would you be my love, my love?",
    coordinates: [0.642894983291626, 0.6179190278053284],
    children: [
      {
        label: "'I love you'",
        nearestLyric: "You should let me love you",
        coordinates: [0.6553199887275696, 0.6297420263290405],
        children: [
          {
            label: "I *still** love you",
            nearestLyric: "I still love you",
            coordinates: [0.6726459860801697, 0.6302980184555054],
          },
        ],
      },
    ],
  },

  {
    label: "Dream Island",
    nearestLyric: "Everything That I've been dreaming of",
    coordinates: [0.5599439740180969, 0.2792370021343231],
  },

  {
    label: "La La Land",
    nearestLyric: "La da la da di da da, la da da da da",
    coordinates: [0.5482959747314453, 0.22986899316310883],
  },

  {
    label: "Apology Archipelago",
    nearestLyric: "But what I need to hear now, your sincere apology",
    coordinates: [0.7558950185775757, 0.5482659935951233],
  },
];

const getFlatListFromList = (
  notFlatListOfLabels: Array<RawLabel> | undefined,
  level = 1
): Array<RawLabel> =>
  // @ts-ignore
  (notFlatListOfLabels || []).reduce(
    //@ts-ignore
    (accumulator, { children, ...rest }) => [
      ...accumulator,
      { ...rest, level },
      ...getFlatListFromList(children, level + 1),
    ],
    []
  );

const LYRIC_VIZ_REGION_LABELS: Object = {
  type: "FeatureCollection",
  name: "lyric_viz_region_labels",
  features: getFlatListFromList(RAW_LABELS_NOT_IN_GEOJSON_FORM).map(
    ({ label, nearestLyric, level, coordinates }) => ({
      type: "Feature",
      properties: {
        label,
        level,
        nearestLyric,
        size: level ? 1 / level : 1, // lower levels are smaller
      },
      geometry: {
        type: "Point",
        coordinates,
      },
    })
  ),
};

const labels: Labels = {
  features: LYRIC_VIZ_REGION_LABELS,
  name: "lyric_viz_region_labels",
  labelKey: "label",
  sizeKey: "size",
};

export default labels;
