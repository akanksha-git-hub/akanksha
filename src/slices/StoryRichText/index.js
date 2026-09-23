import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.StoryRichTextSlice} StoryRichTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StoryRichTextSlice>} StoryRichTextProps
 * @param {StoryRichTextProps}
 */

const StoryRichText = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <div className="w-full max-w-[900px]">

        <PrismicRichText
          field={slice.primary.body}
          components={{

            /* =========================================
               HEADINGS
               ========================================= */

            heading1: ({ children }) => (
              <h2 className="mb-8 font-ambit-semibold text-4xl leading-[1.05] tracking-[-0.025em] text-black md:text-5xl lg:text-6xl">
                {children}
              </h2>
            ),

            heading2: ({ children }) => (
              <h3 className="mb-6 font-ambit-semibold text-3xl leading-[1.08] tracking-[-0.02em] text-black md:text-4xl lg:text-5xl">
                {children}
              </h3>
            ),

            heading3: ({ children }) => (
              <h4 className="mb-5 font-ambit-semibold text-2xl leading-[1.1] text-black md:text-3xl lg:text-4xl">
                {children}
              </h4>
            ),

            heading4: ({ children }) => (
              <h5 className="mb-4 font-ambit-semibold text-xl leading-[1.15] text-black md:text-2xl lg:text-3xl">
                {children}
              </h5>
            ),

            /* =========================================
               PARAGRAPHS
               ========================================= */

            paragraph: ({ children }) => (
              <p className="mb-7 font-ambit-regular text-lg leading-[1.65] text-black md:text-xl md:leading-[1.65]">
                {children}
              </p>
            ),

            /* =========================================
               INLINE FORMATTING
               ========================================= */

            strong: ({ children }) => (
              <strong className="font-ambit-semibold text-black">
                {children}
              </strong>
            ),

            em: ({ children }) => (
              <em className="font-ambit-regular italic">
                {children}
              </em>
            ),

            /* =========================================
               LISTS
               ========================================= */

            list: ({ children }) => (
              <ul className="mb-8 list-disc space-y-3 pl-7 font-ambit-regular text-lg leading-[1.65] text-black md:text-xl">
                {children}
              </ul>
            ),

            oList: ({ children }) => (
              <ol className="mb-8 list-decimal space-y-3 pl-7 font-ambit-regular text-lg leading-[1.65] text-black md:text-xl">
                {children}
              </ol>
            ),

            listItem: ({ children }) => (
              <li className="pl-1">
                {children}
              </li>
            ),

            /* =========================================
               LINKS
               ========================================= */

            hyperlink: ({ children, node }) => (
              <a
                href={node.data.url}
                target={node.data.target || undefined}
                rel={
                  node.data.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-[#2878A0] underline decoration-[1px] underline-offset-4 transition-opacity hover:opacity-70"
              >
                {children}
              </a>
            ),

            /* =========================================
               CODE / PREFORMATTED
               ========================================= */

            preformatted: ({ node }) => (
              <pre className="mb-8 overflow-x-auto rounded-[16px] border border-[#C2BFB7] bg-[#F7F5EF] p-5 font-mono text-sm leading-6 text-black">
                <code>{node.text}</code>
              </pre>
            ),
          }}
        />

      </div>
    </section>
  );
};

export default StoryRichText;