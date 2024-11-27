import { forwardRef } from "react";
import Lottie from "lottie-react";

const LottieContainerB = forwardRef(function LottieContainerB({ lottieData, className, ...props }, ref){

    let LottieData = null;

    if(lottieData) {

        LottieData = JSON.parse(lottieData);

        return (
                <div
                    className={className}
                >
                    <Lottie 
                        
                        lottieRef={ref}
                        animationData={LottieData}
                        className="h-full w-full border border-red-500"
                        {...props}
                    />
                </div>
            )
    }

    return null;

});

export default LottieContainerB;
