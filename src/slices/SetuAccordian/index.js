"use client";
import { PrismicLink } from "@prismicio/react";
import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";

export default function FinancialsAccordion({ slice }) {
  const [onMount, setOnMount] = useState(false);
  const [openIndexes, setOpenIndexes] = useState({ left: null, right: null }); // ✅ Separate open state

  useEffect(() => {
    if (!onMount) {
      setOnMount(true);
    }
  }, [onMount]);

  if (!onMount) return <Skeleton count={5} itemClassName="h-24" />;

  const items = slice.primary.year_groups || [];
  const halfDataLength = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, halfDataLength);
  const secondHalf = items.slice(halfDataLength);
  const documents = slice.primary.documents || [];
  const isNewsletter = slice.variation === "newsletter"; 

  const { show_identifier, slice_identifier } = slice.primary;

  const RenderIdentifier = () =>
    show_identifier && <SliceIdentifier text={slice_identifier} />;

  const toggleAccordion = (index, column) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [column]: prev[column] === index ? null : index,
    }));
  };

  return (
    <section className=" mt-12">
      {/* Conditionally Render SliceIdentifier and RichText */}
      {!isNewsletter && (
        <>
                    <RenderIdentifier />

          <RichText
            text={slice.primary.title}
            className="font-ambit-regular text-3xl md:text-6xl w-[18ch] text-left md:text-center mx-auto mt-14  "
          />
        </>
      )}

      <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2 w-full lg:w-[880px] 3xl:w-[1000px] lg:mx-auto pt-12   ">
        {[firstHalf, secondHalf].map((half, colIndex) => (
          <div key={colIndex}>
            {half.map((yearItem, index) => {
              const column = colIndex === 0 ? "left" : "right";
              const isOpen = openIndexes[column] === index;

              // 🔹 Match documents with correct formatting
              const matchedDocuments = documents.filter((doc) => {
                const docYear = normalizeYear(doc.year_identifier);
                const yearGroupYear = normalizeYear(yearItem.year);
                return docYear === yearGroupYear;
              });

              return (
                <div key={index} className="border border-gray-300 p-4">
                  {/* Accordion Title */}
                  <button
                    onClick={() => toggleAccordion(index, column)}
                    className="flex justify-between w-full text-left text-xl font-semibold text-black hover:text-gray-600 transition-all"
                  >
                    {yearItem.year}
                    <span className="transition-transform duration-300">
                      {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {/* Accordion Content */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mt-4 space-y-2 p-2">
                      {matchedDocuments.length > 0 ? (
                        matchedDocuments.map((doc, docIndex) => (
                          <PrismicLink
                            key={docIndex}
                            field={doc.link}
                            target="_blank"
                            className="block text-green-600 hover:opacity-75 transition-all"
                          >
                            {doc.title || "View Document"}
                          </PrismicLink>
                        ))
                      ) : (
                        <p className="text-gray-500">No documents available</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function normalizeYear(yearString) {
  if (!yearString) return "";

  let normalized = yearString.trim().toLowerCase();
  normalized = normalized.replace(/(\d{4})-(\d{2})/, "$1 - 20$2");

  return normalized;
}

// ✅ SVG Icons for Up and Down Arrows (Hollow Style)
function UpArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}
