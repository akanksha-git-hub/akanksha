import SliceIdentifier from "@/components/SliceIdentifier";
import TestimonialSingle from "@/components/Testimonials/testimonial-single";

/**
 * @typedef {import("@prismicio/client").Content.TestimonialSlice} TestimonialSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestimonialSlice>} TestimonialProps
 * @param {TestimonialProps}
 */
const Testimonial = ({ slice }) => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <SliceIdentifier className='mb-12' text={slice.primary.slice_identifier} />
      {slice.variation === 'single' && (<TestimonialSingle slice={slice} />)}
    </section>
  );
};

export default Testimonial;
