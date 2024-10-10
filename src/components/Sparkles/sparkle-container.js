import SparkleText from "./sparkle-text";


export default function SparkleContainer({ slice }) {
    return(
        <div className="flex flex-col items-center justify-center space-y-8 950px:space-y-3">
            <SparkleText 
                slice={slice}
            />
            <SparkleText 
                slice={slice}
                isRight
            />
        </div>
    )
}