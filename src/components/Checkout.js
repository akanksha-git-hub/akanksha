'use client'

import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";

export default function Checkout({ amount }) {

    const stripe = useStripe();
    const elements = useElements();
    
    const [errorMessage, setErrorMessage] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => { 

        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ amount: convertToSubCurrency(amount) })
        })
            .then(res => res.json())
            .then(data => setClientSecret(() => data.clientSecret))

    }, [amount]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(() => true);

        if (!stripe || !elements) return;

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(() => submitError.message);
            setLoading(() => false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/payment-success?amount=${amount}`
            }
        });

        if (error) {
            setErrorMessage(() => error.message);

        } else {

        }

        setLoading(() => false);

    }

    const options = {
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false
        }
    }


    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        )
    }

  return (
    <div>
        <form className="grid place-items-center" onSubmit={handleSubmit}>
            {clientSecret && (<PaymentElement options={{layout: "accordion"}} className="bg-deep-green p-2 !text-white" />)}
              <button className="bg-deep-green text-white p-4 w-full transition-all hover:opacity-85 mt-4" type="submit">
                  {loading ? 'Processing': `Pay ${amount}`}
              </button>
              {errorMessage && <p>{errorMessage}</p>}
        </form>  
    </div>
  )
}


// 4000003560000008  INDIAN VISA CARD
