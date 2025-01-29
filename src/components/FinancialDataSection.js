// import FinancialsAccordion from "@/components/financials-accordion";
// import RichText from "@/components/Texts/RichText";
// import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
// import { maxwidth } from "@/utils/helperClasses";

// export default async function FinancialDataSection() {
//   // Fetch financials page data
//   const page = await fetchPrismicSingleDocument("financials");

//   if (!page) return <p>No financial data available.</p>;

//   return (
//     <section className={`${maxwidth} universal-padding`}>
//       <div className="relative w-fit md:mx-auto">
//         {/* Title */}
//         <RichText
//           text={page.data.title}
//           className="text-deep-green font-ambit-regular text-7xl text-left md:text-center w-full pt-24"
//         />
//         {/* Accordion */}
//         <div className="mt-12">
//           <FinancialsAccordion item={page.data} />
//         </div>
//       </div>
//     </section>
//   );
// }
