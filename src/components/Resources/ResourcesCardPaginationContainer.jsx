import { useSmoothScroller } from "../LenisScrollContext";
import CTA from "../UI/Button/CTA";
import Button from "../v2-components/buttons/button";
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
          {initial !== 0 && <Button rev  onClick={decrementFunction} >Prev</Button>}
          {final !== totalLength && (
            <Button onClick={incrementFunction} >Next</Button>
          )}
        </div>
      )}
    </>
  );
}
