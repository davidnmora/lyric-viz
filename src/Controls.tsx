import MultiRangeSlider from "multi-range-slider-react";
import { useContext, useState } from "react";
import Select from "@atlaskit/select";
import {
  DeepScatterContext,
  retrieveDomainForAnEncodedAestheticProperty,
  retrieveRangeForAnEncodedAestheticProperty,
} from "./DeepScatterWrapper";

const MultiSelectDropdown = ({
  catagoricalEncoding,
  updateCatagoricalFilter,
  field,
}: {
  catagoricalEncoding: string;
  updateCatagoricalFilter: Function;
  field: string;
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { plotRef } = useContext(DeepScatterContext);
  const catagoricalOptions = retrieveDomainForAnEncodedAestheticProperty({
    field: catagoricalEncoding,
    plot: plotRef.current,
  });

  const colorRange = retrieveRangeForAnEncodedAestheticProperty({
    field: catagoricalEncoding,
    plot: plotRef.current,
  });

  const options = catagoricalOptions.map((id: any, index) => ({
    label: (
      <div style={{ color: colorRange[index % colorRange.length] }}>{id}</div>
    ),
    value: id,
  }));

  return (
    <>
      <h2>
        <label htmlFor="multi-select">
          Filter to a genre (note: can only do 1 filter at a time currently)
        </label>
      </h2>
      <Select
        isMulti
        options={options}
        placeholder="Choose categories"
        value={selectedValues}
        // @ts-ignore
        onChange={(newlySelectedValues: Array<never>) => {
          setSelectedValues(newlySelectedValues);
          updateCatagoricalFilter({
            field,
            selectedValues: newlySelectedValues.map(({ value }) => value),
          });
        }}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
      />
    </>
  );
};
export type RangeSliderPropsType = {
  field: string;
  updateRangeFilter: Function;
  lowerBound: number;
  upperBound: number;
};

const MultiRangeSliderComp = ({
  field,
  updateRangeFilter,
  lowerBound,
  upperBound,
}: RangeSliderPropsType) => {
  const [minValue, setMinValue] = useState(lowerBound);
  const [maxValue, setMaxValue] = useState(upperBound);

  const handleMultiRangeSliderInput = (e: any) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);

    updateRangeFilter({ field, min: e.minValue, max: e.maxValue });
  };

  return (
    <>
      <h2>Slide either end to filter between 1958-Oct 2022</h2>
      <MultiRangeSlider
        min={lowerBound}
        max={upperBound}
        step={0.01}
        minValue={minValue}
        maxValue={maxValue}
        onInput={handleMultiRangeSliderInput}
      />
    </>
  );
};

const Controls = ({
  rangeSliderProps,
  catagoricalField,
  catagoricalEncoding,
  updateCatagoricalFilter,
}: {
  rangeSliderProps: RangeSliderPropsType;
  catagoricalField: string;
  catagoricalEncoding: string;
  updateCatagoricalFilter: Function;
}) => {
  const { initialLoadComplete /*, plotRef*/ } = useContext(DeepScatterContext);
  if (!initialLoadComplete) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100000000,
        width: 350,
        padding: 24,
      }}
    >
      {/* <button
        onClick={() => {
          if (plotRef.current) {
            console.log("copied:", plotRef.current?._zoom?.current_corners());
            navigator.clipboard.writeText(
              JSON.stringify(plotRef.current?._zoom?.current_corners())
            );
          }
        }}
      >
        Click me get current bbox
      </button> */}
      <MultiRangeSliderComp {...rangeSliderProps} />
      <MultiSelectDropdown
        field={catagoricalField}
        catagoricalEncoding={catagoricalEncoding}
        updateCatagoricalFilter={updateCatagoricalFilter}
      />
    </div>
  );
};

export default Controls;
