export default function Skeleton({ count, containerClass, itemClassName }) {

    let array = [""];
    let i = 0;

    if(count) {
        for(i; i < count; i++) {
            array[i] = "";
        }
    }

    return(
        <ul role="status" className={`w-full animate-pulse space-y-2 ${containerClass}`}>
            {array.map((_, i) => <li key={i} className={`h-6 bg-gray-200 rounded-md dark:bg-gray-300 max-w-full ${itemClassName}`} />)}
        </ul>
    )
}