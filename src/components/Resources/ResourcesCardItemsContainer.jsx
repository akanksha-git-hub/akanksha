import { months } from '@/utils/months';
import Skeleton from '../Skeleton';
import { useResourcesCardContext } from './ResourcesCard'
import { useEffect } from 'react';

export default function ResourcesCardItemsContainer({ children, itemKeyFn, isFilter }) {

  const { 
    slice, 
    state: { initial, final }, 
    isLoading, 
    filterValues: { 
        month: filteredMonth, 
        year: filteredYear 
      },
    handleSetCurrentData,
    currentData
  } = useResourcesCardContext();

  const parsedInt = parseInt(filteredYear);

  let sortedArray;

  if(!isFilter) {

    sortedArray = slice.primary.card_items.sort((a, b) => {

      const timeA = new Date(a.date);
      const timeB = new Date(b.date);
  
      const timeC = timeB - timeA;
  
      return timeC;
    });

  } else {

    console.log('AAAAAAAAAA');
    
    if(filteredMonth && filteredYear) {
      console.log('BBBBBBBBBBBBBB');
      sortedArray = slice.primary.card_items.filter(item => {

        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = months[date.getMonth()];
  
        const match = (year === parsedInt) && (month === filteredMonth)
  
        return match;
  
      }).sort((a, b) => {
  
        const timeA = new Date(a.date);
        const timeB = new Date(b.date);
    
        const timeC = timeB - timeA;
    
        return timeC;
  
      });
    }


    if(!filteredYear && filteredMonth) {
      console.log('CCCCCCCCCCCCCCCCCCC');
      sortedArray = slice.primary.card_items.filter(item => {

        const date = new Date(item.date);
        const month = months[date.getMonth()];
  
        const match = month === filteredMonth;
  
        return match;
  
      }).sort((a, b) => {
  
        const timeA = new Date(a.date);
        const timeB = new Date(b.date);
    
        const timeC = timeB - timeA;
    
        return timeC;
  
      });
    }


    if(!filteredMonth && filteredYear) {
      console.log('DDDDDDDDDDDDDDDDDDDDDDD');
      sortedArray = slice.primary.card_items.filter(item => {

        const date = new Date(item.date);
        const year = date.getFullYear();

        console.log(year, filteredYear)
  
        const match = year === parsedInt;
        
        console.log(match, 'YEAR MATCH')
        return match;
  
      }).sort((a, b) => {
  
        const timeA = new Date(a.date);
        const timeB = new Date(b.date);
    
        const timeC = timeB - timeA;
    
        return timeC;
  
      });
    }

    if(!filteredMonth && !filteredYear) {
      console.log('EEEEEEEEEEEEEEEEEE');
      sortedArray = slice.primary.card_items.sort((a, b) => {

        const timeA = new Date(a.date);
        const timeB = new Date(b.date);
    
        const timeC = timeB - timeA;
    
        return timeC;
      });
    }

  }

  let shaveSlice;

  shaveSlice = sortedArray.slice(initial, final);

  useEffect(() => {

    handleSetCurrentData(sortedArray);

  }, []);

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
