import { NextResponse } from "next/server";


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

    try {
        const { amount } = await req.json();

        // Create a PAYMENT INTENT with the order amount and currency

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
            description: "for testing",
            shipping: {
                name: "Gradical",
                address: {
                    line1: "Kazhakootam TechnoPark Phase1",
                    postal_code: "695581",
                    city: "Trivandrum",
                    state: "KL",
                    country: "IN",
                },
            },
            automatic_payment_methods: { enabled: true }
        });


        return NextResponse.json({ clientSecret: paymentIntent.client_secret }); // return client secret to finish payment on the client

    } catch (error) {
        console.log(`Internal Server error: ${error}`);

        return NextResponse.json(
            { error: `Internal Server error: ${error}` },
            { status: 500 }
        );
    }

}