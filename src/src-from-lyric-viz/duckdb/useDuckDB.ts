import React from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import * as rd from "@duckdb/react-duckdb";

export default () => {
  const db: rd.Resolvable<
    duckdb.AsyncDuckDB,
    duckdb.InstantiationProgress,
    string
  > = rd.useDuckDB();
  const resolveDB = rd.useDuckDBResolver();
  const [connection, setConnection] = React.useState<
    duckdb.AsyncDuckDBConnection | undefined
  >(undefined);

  // const { lastQueryResults, queryState, runQuery } = useSqlQuery(connection);

  // After the database resolves, create a connection that can be
  // used for issuing queries
  React.useEffect(() => {
    if (!db.resolving()) {
      resolveDB()
        .then((d) => d?.connect())
        .then(setConnection);
    }
  }, [db]);
  return { db, connection };
};
