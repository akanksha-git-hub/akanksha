import VideoLinkCardItem from "./VideoLinkCardItem"


export default function VideoLinkCardWrapper({ children, className }) {
  return (
    <ul className={className}>{children}</ul>
  )
}


VideoLinkCardWrapper.CardItem = VideoLinkCardItem;

{/* <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-12"
    >
      <VideoLinkCardWrapper className='grid lg:grid-cols-2 gap-x-6 2xl:gap-x-0 gap-12 xl:grid-cols-3 place-items-center'>
        {sortedData.map((card_item, index) => {

          const date = new Date(card_item.date).toLocaleString('default', options);

          return(
            <VideoLinkCardWrapper.CardItem 
              key={index}
              className='p-4 rounded-[10px] w-full lg:w-[400px] 2xl:w-[420px] border border-deep-green transition-all bg-off-white hover:bg-bright-yellow'
            >
              <div className="video-link-card overflow-hidden rounded-[10px]">
                <PrismicNextLink 
                  className="relative" field={card_item.cta_link}
                  target="_blank"
                >
                  <PrismicNextImage 
                    className="h-full w-full object-cover"
                    field={card_item.image}
                  />
                    <p className="video-link-card-message">
                      <span className="bg-bright-yellow text-deep-green font-ambit-regular text-center py-2 px-4 text-base rounded-full">
                        View
                      </span>
                    </p>
                </PrismicNextLink>
              </div>
              <div className="mt-6">
                <RichText 
                  className='text-deep-green font-ambit-semibold text-2xl'
                  text={card_item.title}
                />
                <RichText 
                  className='text-deep-green font-ambit-regular text-2xl'
                  text={card_item.sub_title}
                />
                <RichText 
                  className='font-ambit-regular text-deep-green opacity-60'
                  text={`${date}`}
                />
              </div>
            </VideoLinkCardWrapper.CardItem>
          )})}
      </VideoLinkCardWrapper>
    </section> */}