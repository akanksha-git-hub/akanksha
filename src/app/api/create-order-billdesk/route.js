import billDesk from '@api/billdesk';
import { NextResponse } from 'next/server';
import { v4 } from "uuid";


export async function POST(req) {

    const bodyData = await req.json();

    const { amount, user_agent } = await bodyData;

    const baseURL = `https://uat1.billdesk.com/u2`;
    const endpoint = `/payments/ve1_2/orders/create`;
    const date = new Date();
    const dateString = date.toISOString();

    const response = await fetch('https://api.ipify.org/?format=json');

    const uniqueId = v4();

    if(response) {
        const { ip: ipAddress } = await response.json();
        // billDesk.createOrder({
        //     orderid: 'TEST00000090066',
        //     mercid: 'BDSKUATY',
        //     order_date: dateString,
        //     amount: `${amount}`,
        //     currency: '356',
        //     ru: 'https://akanksha-tfsx.vercel.app/',
        //     itemcode: 'DIRECT',
        //     device: {
        //         init_channel: 'internet',
        //         ip: ipAddress,
        //         user_agent,
        //         accept_header: 'application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
        //     },
        // }, {
        //     "BD-Timestamp": `20201203182838`,
        //     "Content-Type" : "application/json",
        //     "BD-Traceid" : `20201203182838`,
        //     "Accept" : "application/jose",
        // })
        // .then(({ data }) => console.log(data.bdorderid, 'BD ORDER ID'))
        // .catch(err => console.error(err, "ERRORRRRRR"));
        const url = 'https://uat1.billdesk.com/u2/payments/ve1_2/orders/create';
const options = {
  method: 'POST',
  headers: {
    'BD-Traceid': '20201203182838',
    // trace-id
    'BD-Timestamp': '20201203182838',
    'Content-Type': 'application/json',
    Accept: 'application/jose'
  },
  body: JSON.stringify({
    orderid: 'TEST0000009005',
    mercid: 'BDMERCID',
    order_date: '2023-03-25T15:14:39+05:30',
    amount: '29999.28',
    currency: '356',
    ru: 'https://www.merchant.com',
    itemcode: 'DIRECT',
    device: {
      init_channel: 'internet',
      ip: '123.0.0.1',
      user_agent: 'Mozilla/5.0(WindowsNT10.0;WOW64;rv: 51.0)Gecko/20100101Firefox/51.0',
      accept_header: 'application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    }
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json, 'BILLME'))
  .catch(err => console.error(err, 'ERRME'));
    }
    
    return NextResponse.json({ message: 'Hello' });
}

/* 
    mercid
    Checksum Key - G3eAmyVkAzKp8jFq0fqPEqxF4agynvtJ
    Security ID – bdskuaty  
*/  