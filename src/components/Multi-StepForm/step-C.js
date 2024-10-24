'use client'
import RichText from "../Texts/RichText";
import Input from "./input";

export default function StepC({}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fdObject = Object.fromEntries(formData.entries()); 
        console.log(fdObject, 'HELLO')
    }

    return(
        <div className="flex flex-col items-center h-full w-full mt-24">
            <RichText 
                text="More Information"
                className='font-ambit-regular text-deep-green text-4xl lg:text-7xl max-w-[90%] text-center my-12'
            />
            <form onSubmit={handleSubmit} className="w-[70%] h-full">
                <p className="font-ambit-semibold text-deep-green text-2xl mb-6">
                    Fields marked with <sup className="text-[#C80707]">*</sup> are mandatory
                </p>
                <div className="flex items-center justify-between mb-8">
                    <Input 
                        name="first_name" placeholder="First Name*"
                        className='w-[48%]'
                    />
                    <Input 
                        name="last_name" placeholder="Last Name*"
                        className='w-[48%]'
                    />
                </div>
                <div className="flex flex-col space-y-8">
                    <select className="p-4 bg-cream border-2 border-deep-green font-ambit-semibold" name="state">
                        <option className="!text-[#A9AEB6]">
                            State
                        </option>
                        <option>
                            A
                        </option>
                        <option>
                            B
                        </option>
                    </select>
                    <Input 
                        name="city" placeholder="City*"
                        className='w-full'
                    />
                    <Input 
                        name="address" placeholder="Address*"                        
                        className='w-full'
                    />
                    <Input 
                        name="postal_code" placeholder="Postal Code*"                        
                        className='w-full'
                    />
                    <Input 
                        name="pan_number" placeholder="PAN Number*"                      
                        className='w-full'
                    />
                    <select className="p-4 bg-cream border-2 border-deep-green font-ambit-semibold" name="donation_purpose">
                        <option>
                            I wish to donate for
                        </option>
                        <option>
                            A
                        </option>
                        <option>
                            B
                        </option>
                    </select>
                </div>
                <div className="flex flex-col items-center space-y-8 mt-8">
                    <button
                        type="submit"
                        className="bg-deep-green text-cream border border-black transition-all hover:bg-bright-yellow hover:text-deep-green hover:scale-95
                            hover:border-black hover:border-solid
                            w-fit text-3xl rounded-full py-6 px-24"
                    >
                        Proceed
                    </button>
                    <p className="text-deep-green font-ambit-semibold text-lg w-[90%] text-center">
                        Akanksha provides an Online Payment Gateway through BillDesk to make your donation to us easy, secure and efficient. The BillDesk Payment Gateway uses 128-bit SSL encrypted, highly secure transmission protocols and has been Verisign certified. This ensures that your payment is processed securely.
                    </p>
                    <p className="text-deep-green font-ambit-semibold text-lg w-[90%] text-center">
                    By sharing your details, you agree to receive stories and updates from Akanksha via mobile,  Whatsapp, landline, email and post. If you’d like to change this, please send us an email on 
                    &nbsp;<a className="underline transition-all hover:opacity-40" href="mailto:fundraise@akanksha.org">fundraise@akanksha.org</a></p>
                </div>
            </form>
        </div>
    )
}