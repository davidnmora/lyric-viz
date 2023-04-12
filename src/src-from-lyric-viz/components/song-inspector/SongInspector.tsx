import React from "react";
import useDuckDB from "../../duckdb/useDuckDB";
import { DeepScatterContext } from "../deepscatter/DeepScatterWrapper";
import { getClicheDataForASong } from "../deepscatter/get-cliche-data-for-song";
import type { DataPoint } from "../../the-only-files-that-need-dataset-specific-editing/data-specefic-metadata";

const SimilarLyrics = ({
  title,
  lyrics,
}: {
  title: string;
  lyrics: Array<DataPoint>;
}) => {
  return (
    <div style={{ borderLeft: "1px solid gray" }}>
      <h5>{title}</h5>
      {lyrics.map((dataPoint: DataPoint, index) => (
        <div key={index} style={{ fontSize: 10, color: "grey" }}>
          {dataPoint.lyric_line}
        </div>
      ))}
    </div>
  );
};

const LyricLine = ({
  similarBefore,
  similarAfter,
  lyricLineRow,
}: {
  similarBefore: Array<DataPoint>;
  similarAfter: Array<DataPoint>;
  lyricLineRow: DataPoint;
}) => {
  const similarLyricsExist = !!(similarBefore.length || similarAfter.length);
  return (
    <div>
      <div
        style={{ fontStyle: "italic", opacity: similarLyricsExist ? 1 : 0.4 }}
      >
        {lyricLineRow.lyric_line}
      </div>
      {similarLyricsExist && (
        <div style={{ display: "flex" }}>
          <SimilarLyrics title={"before"} lyrics={similarBefore} />
          <SimilarLyrics title={"after"} lyrics={similarAfter} />
        </div>
      )}
    </div>
  );
};

export default () => {
  // temp
  const { interactionState } = React.useContext(DeepScatterContext);
  const { connection } = useDuckDB({ context: ">>>>Song Inspector<<<<" });
  const [songLyricData, setSongLyricData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("EFFECT", interactionState.clickedDataPoint);
    const song_id = interactionState?.clickedDataPoint?.song_id;
    if (connection && song_id) {
      console.log("Ready to get cliches!", song_id);
      setLoading(true);
      getClicheDataForASong({
        songId: song_id,
        db: connection,
      })
        .then((d: any) => {
          console.log("Fetched this:", d);
          setSongLyricData(d);
        })
        .finally(() => setLoading(false));
    }
  }, [connection, interactionState.clickedDataPoint]);
  const { song, performer } = interactionState?.clickedDataPoint || {};
  return (
    <div style={{ overflow: "scroll", height: 600 }}>
      <h2>Cliches for '{song}'</h2>
      <h4>by {performer}</h4>
      {loading ? (
        <div>Loading...</div>
      ) : (
        songLyricData.map((lyric: any, index: Number) => (
          <LyricLine key={index} {...lyric} />
        ))
      )}
    </div>
  );
};
