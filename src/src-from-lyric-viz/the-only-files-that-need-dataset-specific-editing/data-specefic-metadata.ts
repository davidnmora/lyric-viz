export const CONTINUOUS_FIELD = "chart_debut_date_normalized_0_to_1";
export const CATAGORICAL_FIELD = "generic_genre";
export const TEXT_SEARCH_FIELD = "lyric_line";
export const CATAGORICAL_ENCODING = "color";
export const ANOTHER_CATAGORICAL_VAR_IN_ORDINAL_BANDS = "genre_position_band";
export const LYRIC_CLICHE_COUNT_INTEGER_FIELD = "num_before";
export const SONG_AVG_CLICHENESS_CONTINUOUS_FIELD = "num_before_song_avg";
export const ID_FIELD = "song_id";
export const X_TEXT_EMBEDDING = "x";
export const Y_TEXT_EMBEDDING = "y";

export const CONTINUOUS_LOWER_BOUND = 0;
export const CONTINUOUS_UPPER_BOUND = 100;

export const TILES_FOLDER_NAME_IN_PUBLIC = "deepscatter-tiles";

// const ROOT_REPO_NAME = "ducky-aka-react-duckdb-demo"; // N0TE: served, not from "/", but from "/lyric-viz/" on gh-pages

export const deepscatterInitialPrefs = {
  // source_url: `https://benschmidt.org/arxiv/`,
  // source_url: `${window.location.origin}/${ROOT_REPO_NAME}/${TILES_FOLDER_NAME_IN_PUBLIC}`, // tiles live in /public in react app
  // TODO: I'm fairly sure we want to serve from THIS repo, not some seperate URL. If so, we need to figure out how to
  // make an actual public folder.
  source_url: `https://davidnmora.github.io/lyric-viz/deepscatter-tiles`,
  max_points: 500000, // a full cap.
  zoom_balance: 0.7, // Rate at which points increase size. https://observablehq.com/@bmschmidt/zoom-strategies-for-huge-scatterplots-with-three-js
  point_size: 1, // Default point size before application of size scaling
  background_color: "#ffffff",
  duration: 1000, // zoom duration

  // encoding API based off of Vega Lite: https://vega.github.io/vega-lite/docs/encoding.html
  encoding: {
    x: {
      field: X_TEXT_EMBEDDING,
    },
    y: {
      field: Y_TEXT_EMBEDDING,
    },
    [CATAGORICAL_ENCODING]: {
      field: CATAGORICAL_FIELD,
      domain: [-2047, 2047],
      range: "set1", // for context, this is a D3 color set
    },
    filter: null,
    // filter2: null,
    // jitter_radius: null,
  },
};

export type DataPoint = {
  x: Number;
  y: Number;
  song_id: string;
  lyric_line: string;
  song: string;
  performer: string;
  generic_genre: string;
  chart_debut: string; // I think? maybe it's been cast when the parquet file is read?
  // cliche stuff
  num_before: Number;
  num_after: Number;
  num_before_song_avg: Number;
  num_after_song_avg: Number;
};

export const tooltipHTML = (point: DataPoint): string => {
  // @ts-ignore
  const year = new Date(point.chart_debut).getYear() + 1900;
  return `
    <div style="width: 400px; z-index: 1000;">
      <span></span>
      <h4>(${year}) ${point.lyric_line}</h4>
      
      <div>${point.song}</div>
      <div>${point.performer}</div>
      <div>${point.generic_genre}</div>
      <h4>Cliches</h4>
      <div>before: ${point.num_before}</div>
      <div>song avg: ${point.num_before_song_avg}</div>
      <div>after: ${point.num_after}</div>
      <div>song avg: ${point.num_after_song_avg}</div>
      
      <div>${new Date(point.chart_debut).getFullYear()}</div>
    </div>
`;
};

export const onClickDataPoint = (point: DataPoint) => {
  // https://stackoverflow.com/questions/63033012/copy-the-text-to-the-clipboard-without-using-any-input
  function addToClipboard(TextToCopy: string) {
    var TempText = document.createElement("textarea");
    TempText.value = TextToCopy;
    document.body.appendChild(TempText);
    TempText.select();

    document.execCommand("copy");
    document.body.removeChild(TempText);
  }

  // const youtubeSearchURL =
  //   `https://www.youtube.com/results?search_query=${point.song}+by+${point.performer}`.replace(
  //     " ",
  //     "+"
  //   );
  // @ts-ignore
  const labelStub = `
  {
    label: "",
    nearestLyric: "${point.lyric_line}",
    coordinates: [${point.x}, ${point.y}],
  },
  `;
  console.log(labelStub);
  addToClipboard(labelStub);
  // window.open(youtubeSearchURL, "_blank");
};
