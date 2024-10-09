'use server'
import { v4 } from "uuid";

export const createCashFreeOrder = async (payload) => {

    const baseURL = process.env.NODE_ENV === 'development' ? 
                    process.env.LOCAL_HOST_URL : process.env.NEXT_PUBLIC_PROD_URL;
    const endpoint = process.env.CREATE_ORDER_API_URL;

    try {

        const options = {
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


export const createSubscription = async (payload) => {

    const baseURL = process.env.NODE_ENV === 'development' ?
                    process.env.LOCAL_HOST_URL : process.env.NEXT_PUBLIC_PROD_URL;
    const endpoint = process.env.CREATE_SUBCRIPTION_API_URL;    
    const planId = process.env.SUBSCRIPTION_PLAN_ID || 'akanksha_123';

    try {

        const subscriptionId = v4(); 

        const dummyData = {
            subscriptionId,
            planId,
            customerName: 'Gradical',
            customerPhone: '9999999999',
            customerEmail: 'abhilash@gradical.xyz',
            returnUrl: null,
            authAmount: 10,
            expiresOn: "2024-12-02 00:00:00",
            firstChargeDate: "2024-12-02",
            linkExpiry: 5,
            notificationChannels: ["EMAIL","SMS"]
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(dummyData)
        }

        const response = await fetch(`${baseURL}${endpoint}`, options);

        if(response) {
            const resData = await response.json();
            console.log(resData, 'SERVER RESPONSE');
            return resData;
        }

        return null;
        

    } catch(error) {
        console.log(error, 'ERROR CREATING SUBSCRIPTION');
    }


}