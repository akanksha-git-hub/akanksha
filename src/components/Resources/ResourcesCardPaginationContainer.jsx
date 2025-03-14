import { useSmoothScroller } from "../LenisScrollContext";
import CTA from "../UI/Button/CTA";
import { useResourcesCardContext } from "./ResourcesCard";

export default function ResourcesCardPaginationContainer() {
  const {
    incrementPagination,
    decrementPagination,
    state: { totalLength, initial, final },
  } = useResourcesCardContext();

  const { paginationScrollTo } = useSmoothScroller();

  function incrementFunction() {
    paginationScrollTo();
    incrementPagination(totalLength);
  }

  function decrementFunction() {
    paginationScrollTo();
    decrementPagination();
  }

  return (
    <>
      {totalLength >= 6 && (
        <div className="flex items-center justify-center gap-4 ">
          {initial !== 0 && <CTA onClick={decrementFunction} text="Prev" />}
          {final !== totalLength && (
            <CTA onClick={incrementFunction} text="Next" />
          )}
        </div>
      )}
    </>
  );
}
