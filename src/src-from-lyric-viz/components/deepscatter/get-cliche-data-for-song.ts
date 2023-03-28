// @ts-nocheck
import { formatTextForSQL } from "./deepscatter-and-duckdb-helpers";

// TODO ^ add actual types
export const getClicheDataForASong = async ({ songId, db }) => {
  // FORMATTING
  const formatRawQueryForUse = (raw_query_result) => {
    const temp = {
      resultCount: raw_query_result?.toArray().length,
      labels: [],
      values: [],
      keyValPairs: [],
    };

    raw_query_result.schema.fields.forEach((field) => {
      temp.labels.push(field.name);
      const child = raw_query_result.getChild(field.name);
      let vals = child?.toArray() || [];

      vals.forEach((v, i) => {
        if (!temp.values[i]) {
          temp.values[i] = [];
        }
        if (!temp.keyValPairs[i]) {
          temp.keyValPairs[i] = {};
        }
        temp.values[i].push(vals instanceof BigInt64Array ? Number(v) : v);
        temp.keyValPairs[i][field.name] =
          vals instanceof BigInt64Array ? Number(v) : v;
      });
    });

    return temp;
  };
  // Tables
  const tableNames = formatRawQueryForUse(
    await db.query("SHOW TABLES").then((d) => d)
  ).values.map(([table]) => table);

  // Utility for quering all tables
  const generateQueryForAllTables = (
    tableNames,
    generateQueryStringForOneTable
  ) => {
    return tableNames
      .map((name) => generateQueryStringForOneTable(name))
      .join(" UNION ");
  };

  // Get lines for a song
  const generateClicheQueryForATable =
    (songId, columns = "*") =>
    (tableName) => {
      const searchTerm = `'%${formatTextForSQL(songId)}%'`;
      console.log(searchTerm);
      return `SELECT ${columns} FROM '${tableName}' WHERE song_id LIKE ${searchTerm}`;
    };

  const rawLyricsQuery = await db.query(
    generateQueryForAllTables(tableNames, generateClicheQueryForATable(songId))
  );
  const lyricsForSong = formatRawQueryForUse(rawLyricsQuery);

  // Get cliches for a line
  const querySimilar = async (similar_index_array) => {
    if (similar_index_array.length === 0) {
      return [];
    }
    const similarLyrics = await db.query(
      generateQueryForAllTables(
        tableNames,
        (tableName) =>
          `SELECT * FROM '${tableName}' WHERE the_index IN (${similar_index_array.join(
            ", "
          )})`
      )
    );
    return formatRawQueryForUse(similarLyrics).keyValPairs;
  };

  const getClichesForLyricLine = async (lyricLineRow) => {
    const similar_before_index_array = JSON.parse(
      lyricLineRow["similar_lyric_that_came_before_indices"]
    );
    const similar_after_index_array = JSON.parse(
      lyricLineRow["similar_lyric_that_came_after_indices"]
    );

    return {
      similarBefore: await querySimilar(similar_before_index_array),
      similarAfter: await querySimilar(similar_after_index_array),
      lyricLineRow,
    };
  };

  // Resolve promise for each row
  return Promise.all(
    lyricsForSong.keyValPairs.map((lyricLineRow) =>
      getClichesForLyricLine(lyricLineRow)
    )
  );
};
