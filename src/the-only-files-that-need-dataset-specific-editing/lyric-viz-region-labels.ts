import { Labels } from "../components/deepscatter/DeepScatterWrapper";

const LYRIC_VIZ_REGION_LABELS: Object = {
  type: "FeatureCollection",
  name: "lyric_viz_region_labels",
  features: [
    {
      type: "Feature",
      properties: {
        label: "Dream Island",
        nearestLyric: "Everything That I've been dreaming of",
      },
      geometry: {
        type: "Point",
        coordinates: [0.5599439740180969, 0.2792370021343231],
      },
    },
  ],
};

const labels: Labels = {
  features: LYRIC_VIZ_REGION_LABELS,
  name: "lyric_viz_region_labels",
  labelKey: "label",
};

export default labels;
