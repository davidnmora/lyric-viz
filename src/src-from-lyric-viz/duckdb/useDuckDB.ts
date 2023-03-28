import React from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import * as rd from "@duckdb/react-duckdb";

export default ({ context }: { context?: string }) => {
  const db: rd.Resolvable<
    duckdb.AsyncDuckDB,
    duckdb.InstantiationProgress,
    string
  > = rd.useDuckDB();
  const resolveDB = rd.useDuckDBResolver();
  const [connection, setConnection] = React.useState<
    duckdb.AsyncDuckDBConnection | undefined
  >(undefined);

  React.useEffect(() => {
    console.log(`${context} useEffect db.status`, db.status);
    if (
      db.status === rd.ResolvableStatus.NONE ||
      db.status === rd.ResolvableStatus.COMPLETED
    ) {
      console.log(context);
      resolveDB()
        .then((d) => d?.connect())
        .catch((e) => {
          console.warn(e);
        })
        .then((d: any) => {
          setConnection(d);
          console.log(`${context} CONENCTION SET:`, d);
        });
    }
  }, [db, db.status]);
  return { db, connection };
};
