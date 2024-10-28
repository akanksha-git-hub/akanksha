import billDesk from '@api/billdesk';
import { NextResponse } from 'next/server';



export async function POST(req) {

    const bodyData = await req.json();

    const { amount, user_agent } = await bodyData;

    const baseURL = `https://uat1.billdesk.com/u2`;
    const endpoint = `/payments/ve1_2/orders/create`;
    const date = new Date();
    const dateString = date.toISOString();

    const response = await fetch('https://api.ipify.org/?format=json');

    if(response) {
        const { ip: ipAddress } = await response.json();
        billDesk.createOrder({
            orderid: 'TEST00000090066',
            mercid: 'BDSKUATY',
            order_date: dateString,
            amount: `${amount}`,
            currency: '356',
            ru: 'https://akanksha-tfsx.vercel.app/',
            itemcode: 'DIRECT',
            device: {
                init_channel: 'internet',
                ip: ipAddress,
                user_agent,
                accept_header: 'application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
            },
        })
        .then(({ data }) => console.log(data.bdorderid, 'BD ORDER ID'))
        .catch(err => console.error(err, "ERRORRRRRR"));
    }
    
    return NextResponse.json({ message: 'Hello' });
}