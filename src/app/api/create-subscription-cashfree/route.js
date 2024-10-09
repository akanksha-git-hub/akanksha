import { NextResponse } from "next/server";


export async function POST(req) {

    const bodyData = await req.json();

    const createSubscriptionAPIUrl = process.env.SANDBOX_CREATE_SUBSCRIPTION_URL;

    const options = {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
            'X-Client-Id' : process.env.CASH_FREE_CLIENT_ID,
            'X-Client-Secret' : process.env.CASH_FREE_SECRET_KEY
        },
        body: JSON.stringify(bodyData)
    }

    const response = await fetch(`${createSubscriptionAPIUrl}`, options);

    if(response) {
        const { status, data } = await response.json();

        if(status === 200) return NextResponse.json({ data });

        return NextResponse.json(null);
    }

    return NextResponse.json({ message: 'API RESPONSE' }, { status: 200 });

}