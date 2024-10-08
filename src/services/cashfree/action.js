'use server'

export const createCashFreeOrder = async (payload) => {

    const baseURL = process.env.NODE_ENV === 'development' ? 
                    process.env.LOCAL_HOST_URL : process.env.NEXT_PUBLIC_PROD_URL;
    const endpoint = process.env.CREATE_ORDER_API_URL;

    try {

        let options = {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({ payload })
        }

        const response = await fetch(`${baseURL}${endpoint}`, options);
        
        if(response) {
            const resData = await response.json();

            return resData.orderResponse;
        } else {
            return null
        }


    } catch(err) {
        console.log(err, 'ERROR CREATING ORDER');
    }

}