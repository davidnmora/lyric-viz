import { TEXT_SEARCH_FIELD } from "../../the-only-files-that-need-dataset-specific-editing/data-specefic-metadata";

const create_duckdb_copy = async (tile: any, db: any, arrow: any) => {
  // Builds a copy on duckdb of the data in a tile.
  // the new table will have the same name as the tile.
  const key = tile.key;

  const table_exists_already = db
    .query(
      `SELECT * FROM information_schema.tables WHERE table_name = '${key}'`
    )
    .then((d: any) => d.numRows > 0);

  const table_is_downloaded = tile.download;
  const [is_there /*, is_ready_to_post*/] = await Promise.all([
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
  const databadse = await db.db();
  const conn = await databadse.connect();
  await conn.query(`DROP TABLE IF EXISTS "${name}"`);
  await conn.insertArrowFromIPCStream(ipc, {
    name,
    schema: "main", // Not sure what this is.
    options: {}, // no options.
  });
  await conn.close();
  return key;
};

const addTextSearchAsyncTransformationToPlot = (
  scatterplot: any,
  searchterm: string,
  db: any
) => {
  const arrow = scatterplot.arrow;
  scatterplot._root.transformations[searchterm] = async function (tile: any) {
    // First ensure it exists in duckdb.
    await create_duckdb_copy(tile, db, arrow);
    const key = tile.key;
    // Get the regex query out of duckdb.
    const value = await db.query(
      `SELECT regexp_matches(${TEXT_SEARCH_FIELD}, '${searchterm}')::FLOAT AS "${searchterm}" FROM "${key}"`
    );
    // Grab just the column called 'searchterm' and convert it to
    // a floating point array. DuckDB returns multi-record-batch chunks,
    // so we have to use the Float32Array rather than inserting the arrow
    // column directly.
    const asArray = value.getChild(searchterm).toArray(); // DAVID NOTE: maybe chose a constant, safer column name that ${searchterm}?
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
  db: any
) => {
  if (scatterplot && db) {
    addTextSearchAsyncTransformationToPlot(scatterplot, searchterm, db);
    executeTextSearchFilterOnPlot(searchterm, scatterplot);
  }
};
