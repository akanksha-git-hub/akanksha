/**
 * @typedef {import("@prismicio/client").Content.RetentionSlice} RetentionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RetentionSlice>} RetentionProps
 * @param {RetentionProps}
 */
const Retention = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
     <section class="py-12">
  <div class=" mx-auto px-4 mt-12 max-w-[1200px]">
   
  <h2 class="text-7xl text-center font-ambit-regular w-[6ch] mx-auto mb-20">
 {slice.primary.title}
</h2>

   
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div class="text-center relative ">
  <h3 class="text-8xl font-ambit-regular mb-4">{slice.primary.student_retention_perc}</h3>
  <p class="text-xl font-ambit-regular w-[15ch] mx-auto text-center">
    {slice.primary.student_retention_desc}
  </p>
  <div class="hidden md:block absolute top-1/3 right-0 h-10 border-r border-gray-600"></div>
</div>


 
  <div class="text-center relative">
    <h3 class="text-8xl font-ambit-regular mb-4">{slice.primary.teacher_retention_perc}</h3>
    <p class="text-xl font-ambit-regular w-[15ch] mx-auto text-center">{slice.primary.teacher_retention_desc}</p>
   
    <div class="hidden md:block absolute top-1/3 right-0 h-10 border-r border-black"></div>
  </div>


  <div class="text-center">
    <h3 class="text-8xl font-ambit-regular mb-4">{slice.primary.leadership_retention_prec}</h3>
    <p class="text-xl font-ambit-regular w-[15ch] mx-auto text-center">{slice.primary.leadership_retention_desc}</p>
  </div>
</div>



    
    
  </div>
</section>

    </section>
  );
};

export default Retention;
