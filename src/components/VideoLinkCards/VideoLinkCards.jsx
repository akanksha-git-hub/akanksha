import VideoLinkCardItem from "./VideoLinkCardItem"



export default function VideoLinkCardWrapper({ children, className }) {
  return (
    <ul className={className}>{children}</ul>
  )
}


VideoLinkCardWrapper.CardItem = VideoLinkCardItem;