'use client'
export default function PaymentStatus({ searchParams }) {


    return(
        <p className="h-screen w-full grid place-items-center">
            Payment successfull for Order ID: {searchParams.order_id}
        </p>
    )
}