import Skeleton from '../Skeleton';
import { useResourcesCardContext } from './ResourcesCard'

export default function ResourcesCardItemsContainer({ children, itemKeyFn }) {

  const { slice, state: { initial, final }, isLoading } = useResourcesCardContext();

  const sortedArray = slice.primary.card_items.sort((a, b) => {

    const timeA = new Date(a.date);
    const timeB = new Date(b.date);

    const timeC = timeB - timeA;

    return timeC;
  });

  let shaveSlice;

  shaveSlice = sortedArray.slice(initial, final);

  return (
    <>
      {
        isLoading ? 
        <Skeleton 
          count={8}
          itemClassName='!h-[120px]'
        />
        :
        shaveSlice.map(item => (
          <li key={itemKeyFn(item)}>
            {children(item)}
          </li>
        ))
      }
    </>
  )
}
