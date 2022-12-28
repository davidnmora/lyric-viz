import { createContext, useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore
import ScatterPlot from "./deepscatter-dist-for-ease-of-access-and-edit.js";

export type TooltipHTMLGenerator = (point: any) => string;

export const DeepScatterContext = createContext<any>({});

export const generateRangeFilterObject = ({
  field,
  min,
  max,
}: {
  field: string;
  min: number;
  max: number;
}) => {
  const sizeOfRange = max - min;
  const midpointBetweenTheYears = (max + min) / 2;
  return {
    field,
    op: "within",
    a: sizeOfRange / 2, // how far to extend on either end of the midpoint
    b: midpointBetweenTheYears,
  };
};

export const retrieveDomainForAnEncodedAestheticProperty = ({
  field,
  plot,
}: {
  field: string;
  plot?: ScatterPlot;
}): Array<string> => {
  return plot?._renderer?.aes?.dim(field).current.scale.domain() || [];
};

export const retrieveRangeForAnEncodedAestheticProperty = ({
  field,
  plot,
}: {
  field: string;
  plot?: ScatterPlot;
}): Array<string> => {
  return plot?._renderer?.aes?.dim(field).current.scale.range() || [];
};

export const generateCatagoricalFilter = ({
  field,
  selectedValues,
}: {
  field: string;
  selectedValues: Array<string>;
}) => {
  if (!selectedValues.length) return {};

  const categoryFilters = selectedValues
    .map((value) => `${field} === "${value}"`)
    .join(" || ");

  return {
    field,
    lambda: `${field} => ${categoryFilters}`,
  };
};

const parentDivStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const DeepScatterWrapper = ({
  plotRef,
  prefs,
  tooltipHTML,
  children,
}: {
  plotRef: any;
  prefs: Object;
  tooltipHTML: TooltipHTMLGenerator;
  children: any;
}) => {
  const [initialLoadComplete, setInitiaLoadComplete] = useState<boolean>(false);
  const chartParentId = "deep-scatter-parent-element-id";
  const chartParentRef = useRef(null);

  useEffect(() => {
    if (chartParentRef.current && !plotRef?.current) {
      const _plot = new ScatterPlot(`#${chartParentId}`);
      _plot.tooltip_html = tooltipHTML;
      plotRef.current = _plot;
      // @ts-ignore
      window.plot = _plot; // for debuggin
      console.log("created scatter...");
      plotRef.current.plotAPI(prefs).finally(() => {
        console.log("... initial prefs set");
        setInitiaLoadComplete(true);
      });
    }
  }, [chartParentId, plotRef, chartParentRef, prefs, tooltipHTML]);

  const providerState = useMemo(
    () => ({ initialLoadComplete, plotRef }),
    [initialLoadComplete, plotRef]
  );

  return (
    <DeepScatterContext.Provider value={providerState}>
      {children}
      {/* @ts-ignore */}
      <div style={parentDivStyle} id={chartParentId} ref={chartParentRef} />
    </DeepScatterContext.Provider>
  );
};

export default DeepScatterWrapper;
