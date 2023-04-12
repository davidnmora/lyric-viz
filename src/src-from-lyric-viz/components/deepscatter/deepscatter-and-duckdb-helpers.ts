import * as duckdb from "@duckdb/duckdb-wasm";
import * as rd from "@duckdb/react-duckdb";
import { TEXT_SEARCH_FIELD } from "../../the-only-files-that-need-dataset-specific-editing/data-specefic-metadata";

// This works I think only for double single-quotes? ie SQL doesn't like double double-quotes
export const formatTextForSQL = (str: string) =>
  str.replace(/\"/g, '""').replace(/\'/g, "''");

const create_duckdb_copy = async (
  tile: any,
  db: any,
  arrow: any,
  connection: duckdb.AsyncDuckDBConnection
) => {
  // Builds a copy on duckdb of the data in a tile.
  // the new table will have the same name as the tile.
  const key = tile.key;
  const table_exists_already = connection
    .query(
      `SELECT * FROM information_schema.tables WHERE table_name = '${key}'`
    )
    .then((d: any) => d.numRows > 0);

  const table_is_downloaded = tile.download;
  const [is_there, is_ready_to_post] = await Promise.all([
    table_exists_already,
    table_is_downloaded,
  ]);
  if (is_there) {
    return key;
  }
  const tb = new arrow.Table(tile.record_batch.schema, tile.record_batch);
  if (tb.length === 0) {
    throw new Error("humbug");
  }
  const ipc = arrow.tableToIPC(tb);
  const name = key;

  await connection.query(`DROP TABLE IF EXISTS "${name}"`);
  await connection.insertArrowFromIPCStream(ipc, {
    name,
    schema: "main", // Not sure what this is.
  });

  return key;
};

const addTextSearchAsyncTransformationToPlot = (
  scatterplot: any,
  searchterm: string,
  db: any,
  connection: duckdb.AsyncDuckDBConnection
) => {
  const arrow = scatterplot.arrow;
  scatterplot._root.transformations[searchterm] = async function (tile: any) {
    // First ensure it exists in duckdb.
    await create_duckdb_copy(tile, db, arrow, connection);

    // Get the regex query out of duckdb.
    const key = tile.key;
    const value = await connection.query(
      `SELECT regexp_matches(${TEXT_SEARCH_FIELD}, '${searchterm}', 'i')::FLOAT AS "${searchterm}" FROM "${key}"`
    );
    // Grab just the column called 'searchterm' and convert it to
    // a floating point array. DuckDB returns multi-record-batch chunks,
    // so we have to use the Float32Array rather than inserting the arrow
    // column directly.
    const asArray = value?.getChild(searchterm)?.toArray(); // NOTE: maybe chose a constant, safer column name that ${searchterm}?
    return asArray;
  };
};

const executeTextSearchFilterOnPlot = (
  searchterm: string,
  scatterplot: any
) => {
  const BACKGROUND_SIZE_RATIO = 0.3;
  const FOREGROUND_SIZE_RATIO = 3;

  if (searchterm) {
    scatterplot.plotAPI({
      background_options: {
        size: [BACKGROUND_SIZE_RATIO, FOREGROUND_SIZE_RATIO],
      },
      encoding: {
        foreground: {
          field: searchterm, // basically, we're using the newly inserted binary column to "foreground" search matches
          op: "eq",
          a: 1,
        },
      },
    });
  } else {
    scatterplot.plotAPI({
      background_options: {
        size: [BACKGROUND_SIZE_RATIO, 1], // Bring the foreground size back down to normal.
      },

      encoding: {
        foreground: null,
      },
    });
  }
};

export const filterByTextSearchTerm = (
  scatterplot: any,
  searchterm: string,
  db: rd.Resolvable<duckdb.AsyncDuckDB, duckdb.InstantiationProgress, string>,
  connection: duckdb.AsyncDuckDBConnection
) => {
  console.log("Running update from text search:", searchterm);
  if (searchterm !== "") {
    addTextSearchAsyncTransformationToPlot(
      scatterplot,
      searchterm,
      db,
      connection
    );
  }
  executeTextSearchFilterOnPlot(searchterm, scatterplot);
};
