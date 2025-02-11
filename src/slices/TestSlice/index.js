/**
 * @typedef {import("@prismicio/client").Content.TestSliceSlice} TestSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestSliceSlice>} TestSliceProps
 * @param {TestSliceProps}
 */
const TestSlice = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
   <h1>{slice.primary.title}</h1>
    </section>
  );
};

export default TestSlice;
