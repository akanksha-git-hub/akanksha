import { NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId= process.env.CASH_FREE_CLIENT_ID;
Cashfree.XClientSecret= process.env.CASH_FREE_SECRET_KEY
Cashfree.Environment= Cashfree.Environment.SANDBOX

export async function POST(req) {

    const body = await req.json();
    
    const { payload: amount } = await body;

    let request = {
        "order_amount": amount,
        "order_currency": "INR",
        "customer_details": {
          "customer_id": "node_sdk_test",
          "customer_name": `gradical`,
          "customer_email": `gradical@gmail.com`,
          "customer_phone": `1234567890`,
        },
        "order_meta": {
          "return_url": "http://localhost:3000/payment-status?order_id={order_id}",
          "payment_methods" : "cc, dc, upi"
        },
        "order_note": ""
    }
    
    const createOrder = await Cashfree.PGCreateOrder(`${process.env.CASH_FREE_API_VERSION}`, request);

    /* 
        Recommended values to be stored
        cf_order_id
        payment_session_id
        order_status
    */
    if(createOrder) {
        const orderResponse = {
            cfOrderId: createOrder?.data?.cf_order_id,
            paymentSessionId: createOrder?.data?.payment_session_id,
            paymentMethod: createOrder?.data?.order_meta?.payment_methods,
            orderStatus: createOrder?.data?.order_status,
            order_id: createOrder?.data?.order_id
        }

        return NextResponse.json({ message: 'Order Created!', orderResponse });

    } else {
        return NextResponse.json({ message: 'Failed to create order!'}, { status: 500 });
    }
    
}