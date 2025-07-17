import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.TestSlice} TestSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestSlice>} TestProps
 * @param {TestProps}
 */
const Test = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
    <PrismicRichText field={slice.primary.testing_field}
    components={{
    heading1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    heading2: ({ children }) => <h2 className="text-3xl font-bold mb-4">{children}</h2>,
    paragraph: ({ children }) => <p className="mb-4">{children}</p>,
    list: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
    oList: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
    listItem: ({ children }) => <li className="mb-2">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  }} />
    </section>
  );
};

export default Test;
