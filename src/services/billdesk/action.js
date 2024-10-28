

export const createOrder = async (payload) => {
    console.log(payload, 'ACTION PAYLOAD')
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const response = await fetch(`/api/create-order-billdesk`, options);

        if(response.ok) {
            console.log(response, 'RESPONSE FROM API SERVER')
            return response;
        } else {
            console.log('NO RESPONSE', response);
            return response;
        }

    } catch(err) {
        console.error(err, 'ERROR');
    }

}