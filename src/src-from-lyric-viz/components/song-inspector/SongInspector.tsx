import React from "react";
import useDuckDB from "../../duckdb/useDuckDB";
import { DeepScatterContext } from "../deepscatter/DeepScatterWrapper";
import { getClicheDataForASong } from "../deepscatter/get-cliche-data-for-song";

type LyricRowFromDB = {
  lyric_line: string;
  performer: string;
  song: string;
};

const SimilarLyrics = ({
  title,
  lyrics,
}: {
  title: string;
  lyrics: Array<LyricRowFromDB>;
}) => {
  return (
    <div style={{ borderLeft: "1px solid gray" }}>
      <h5>{title}</h5>
      {lyrics.map(({ lyric_line }: { lyric_line: string }) => (
        <div style={{ fontSize: 10, color: "grey" }}>{lyric_line}</div>
      ))}
    </div>
  );
};

const LyricLine = ({
  similarBefore,
  similarAfter,
  lyricLineRow,
}: {
  similarBefore: Array<LyricRowFromDB>;
  similarAfter: Array<LyricRowFromDB>;
  lyricLineRow: LyricRowFromDB;
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

export default ({ songId = "Shape Of YouEd Sheeran" }) => {
  // temp
  const { interactionState } = React.useContext(DeepScatterContext);
  const { db, connection } = useDuckDB();
  const [songLyricData, setSongLyricData] = React.useState<any>([]);

  React.useEffect(() => {
    console.log("EFFECT", interactionState.searchtext);
    if (db && connection) {
      console.log("Ready to get cliches!");
      getClicheDataForASong({ songId, db: connection }).then((d: any) => {
        console.log("Fetched this:", d);
        setSongLyricData(d);
      });
    }
  }, [db, connection, songId, interactionState.searchtext]);

  return (
    <div style={{ overflow: "scroll", height: 600 }}>
      <h2>Inspect Cliches for a song</h2>
      {songLyricData.map((lyric: any) => (
        <LyricLine {...lyric} />
      ))}
    </div>
  );
};
