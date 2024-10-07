'use client'

import { FormInput } from "@/components/UI/form-input";
import { handleCreateOrder } from "@/services/cashfree/repository";
import { useState } from "react";
import { load } from '@cashfreepayments/cashfree-js'
import { useRouter } from "next/navigation";

let INITIAL_STATE = {
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_uid: ''
}

export default function TestPage() {

    const [formState, setFormState] = useState(INITIAL_STATE);
    const router = useRouter();

    async function handleSubmit(e, amount) {
        e.preventDefault();

        const data = {
            ...formState,
            amount
        };

        const cashFreeOrderData = await handleCreateOrder(data);

        if(cashFreeOrderData) {
            const cashfree = await load({
                mode: "sandbox"
            });
            let checkoutOptions = {
                paymentSessionId: cashFreeOrderData.paymentSessionId,
                redirectTarget: '_blank',
                paymentMethod: cashFreeOrderData.paymentMethod
            }

            cashfree.checkout(checkoutOptions).then((result) => {
                if(result.error){
                    // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                    console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                    console.log(result.error);
                }
                if(result.redirect){
                    // This will be true when the payment redirection page couldnt be opened in the same window
                    // This is an exceptional case only when the page is opened inside an inAppBrowser
                    // In this case the customer will be redirected to return url once payment is completed
                    console.log("Payment will be redirected");
                }
                if(result.paymentDetails){
                    // This will be called whenever the payment is completed irrespective of transaction status

                    // router.push(`${cashFreeOrderData.returnUrl}?order_id=${cashFreeOrderData?.orderId}`);
                    console.log("Payment has been completed, Check for Payment Status");
                    console.log(result.paymentDetails.paymentMessage);
                }
            });
        }
    }


    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value

        setFormState((prevState) => {
            return {
                ...prevState,
                [name]:value,
            }

        });

        setFormState((prevState) => ({
            ...prevState,
            customer_uid: prevState.customer_phone
        }));

    }

    return (
        <main className="h-screen w-full">
            <form>
                <FormInput 
                    label='Name'
                    name="customer_name"
                    type="text"
                    onChange={(e) => handleChange(e)}
                />
                <FormInput 
                    label='Email'
                    name="customer_email"
                    type="email"
                    onChange={(e) => handleChange(e)}
                />
                <FormInput 
                    label='Number'
                    name="customer_phone"
                    type="text"
                    onChange={(e) => handleChange(e)}
                />
                <button onClick={(e) => handleSubmit(e, 200)}>
                    Submit
                </button>    
            </form>
        </main>
    )
}