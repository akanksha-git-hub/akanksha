'use client'
import { createOrder } from "@/services/billdesk/action";

export default function Dummy() {

    async function handleSubmit(e) {
        e.preventDefault();

        const user_agent = navigator.userAgent        
        const formData = new FormData(e.target);
        const amount = formData.get('amount');

        const finalData = {
            user_agent,
            amount
        };

        const response = await createOrder(finalData);

        console.log(response, 'CLIENT RESPONSE');
    }

    let utterance = new SpeechSynthesisUtterance('HI DAKSHINA');

    speechSynthesis.speak(utterance);

    return(
        <form onSubmit={handleSubmit} className='grid place-items-center'>
            <div>
                <label>Enter amount</label>
                <input name="amount" placeholder="200rs" />
            </div>
            <button type="submit">
                Donate
            </button>
        </form>
    )
}