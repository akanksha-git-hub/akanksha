'use server'
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.CASH_FREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASH_FREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export const handleCreateOrder = async (orderData) => {

    const { amount, customer_name, customer_email, customer_phone, customer_uid } = orderData;

    var request = {
        "order_amount": amount,
        "order_currency": "INR",
        "customer_details": {
          "customer_id": "node_sdk_test",
          "customer_name": `${customer_name}`,
          "customer_email": `${customer_email}`,
          "customer_phone": `${customer_phone}`,
        },
        "order_meta": {
          "return_url": "http://localhost:3000/payment-status?order_id={order_id}",
          "payment_methods" : "cc, dc, upi"
        },
        "order_note": ""
    }   

    const createOrder = await Cashfree.PGCreateOrder('2023-08-01', request);
    // Recommended to store these 3 values by CASHFREE
    /* 
      cf_order_id
      payment_session_id
      order_status
    */
   /* 
    EXTRA VALUES
    order_id
   */

    const cfOrderId = createOrder?.data?.cf_order_id || null;
    const paymentSessionId = createOrder?.data?.payment_session_id || null;
    const paymentMethod = createOrder?.data?.order_meta?.payment_methods;
    const orderId = createOrder?.data?.order_id || null;
    const orderStatus = createOrder?.data?.order_status || null;
    const returnUrl = createOrder?.data?.order_meta?.return_url || null;

    const data = {
      cfOrderId,
      paymentSessionId,
      orderId,
      orderStatus,
      paymentMethod,
      returnUrl
    };

    if(createOrder) return data // Order Created;
    
    return null;
}
