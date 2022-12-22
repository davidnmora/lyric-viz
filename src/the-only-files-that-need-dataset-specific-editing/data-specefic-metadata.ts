export const CONTINUOUS_FIELD = "chart_debut_date_normalized_0_to_1";
export const CATAGORICAL_FIELD = "generic_genre";
export const CATAGORICAL_ENCODING = "color";
export const ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS = "genre_position_band";
export const ID_FIELD = "song_id";
export const X_TEXT_EMBEDDING = "x";
export const Y_TEXT_EMBEDDING = "y";

export const CONTINUOUS_LOWER_BOUND = 0;
export const CONTINUOUS_UPPER_BOUND = 1;

export const TILES_FOLDER_NAME_IN_PUBLIC = "deepscatter-tiles-10k-per-tile";

export const deepscatterInitialPrefs = {
  // source_url: `https://benschmidt.org/arxiv/`,
  source_url: `${window.location.origin}/${TILES_FOLDER_NAME_IN_PUBLIC}`, // tiles live in /public in react app
  // source_url: `/tiles`,
  max_points: 500000, // a full cap.
  alpha: 500, // Target saturation for the full page.
  zoom_balance: 0.7, // Rate at which points increase size. https://observablehq.com/@bmschmidt/zoom-strategies-for-huge-scatterplots-with-three-js
  point_size: 4, // Default point size before application of size scaling
  background_color: "#ffffff",
  click_function: "console.log(JSON.stringify(datum, undefined, 2))",
  duration: 1000, // zoom duration

  // encoding API based off of Vega Lite: https://vega.github.io/vega-lite/docs/encoding.html
  encoding: {
    x: {
      field: X_TEXT_EMBEDDING,
      transform: "literal",
    },
    y: {
      field: Y_TEXT_EMBEDDING,
      transform: "literal",
    },
    [CATAGORICAL_ENCODING]: {
      field: CATAGORICAL_FIELD,
      domain: [-2047, 2047],
      range: "set1", // for context, this is a D3 color set
    },
  },
};
