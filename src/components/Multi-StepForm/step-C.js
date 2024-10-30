'use client'
import RichText from "../Texts/RichText";
import Input from "./input";

export default function StepC({}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fdObject = Object.fromEntries(formData.entries()); 
    }

    const isDisabled = true;

    return(
        <div className="flex flex-col items-center h-full w-full mt-24">
            <RichText 
                text="Contact Information"
                className='font-ambit-regular text-deep-green text-6xl lg:text-7xl max-w-[90%] text-center mb-12 mt-36'
            />
            <form onSubmit={handleSubmit} className="w-[90%] md:w-[80%] 2xl:w-[70%] h-full">
                <div className="space-y-2 mb-12">
                    <div>
                        <p className="font-ambit-regular text-deep-green text-2xl mb-6 text-center sm:text-left">
                            Fields marked with <span className="text-[#C80707]">*</span> are mandatory
                        </p>
                        <div className="space-y-6 border-b-[2px] border-newGray pb-6">
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <Input 
                                    label='First Name*'
                                    name="first_name" placeholder="First Name"
                                    className='w-full sm:w-[48%]'
                                />
                                <Input 
                                    label='Last Name'
                                    name="last_name" placeholder="Last Name"
                                    className='w-full sm:w-[48%]'
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <Input 
                                    label='Email Id*'
                                    name="email" placeholder="Email Id"
                                    className='w-full sm:w-[48%]'
                                />
                                <Input 
                                    label='Mobile No*'
                                    name="mobile" placeholder="+91"
                                    className='w-full sm:w-[48%]'
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-ambit-regular text-deep-green text-2xl mb-6 mt-4">
                            Please enter your location details
                        </p>
                        <div className="space-y-6 border-b-[2px] border-newGray pb-6">
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <p className="input-parent-state flex flex-col space-y-1 w-full sm:w-[48%]">
                                    <label className="font-ambit-regular text-lg label-state">
                                        Select your Country*
                                    </label>
                                    <select className="input-state" name="country">
                                        <option className="!text-[#A9AEB6]">
                                            Country
                                        </option>
                                        <option>
                                            A
                                        </option>
                                        <option>
                                            B
                                        </option>
                                    </select>
                                </p>
                                <p className="input-parent-state flex flex-col space-y-1 w-full sm:w-[48%]">
                                    <label className="font-ambit-regular text-lg label-state">
                                        Select State*
                                    </label>
                                    <select className="input-state" name="state">
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
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <Input 
                                    label='Enter your City'
                                    name='city' placeholder='City'
                                    className='w-full sm:w-[48%]'
                                    />
                                <Input 
                                    label='Enter your Address*'
                                    name="address" placeholder="Address"
                                    className='w-full sm:w-[48%]'
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <Input 
                                    label='Enter your Pincode'
                                    name='pincode' placeholder='XX-XXX-XX'
                                    className='w-full sm:w-[48%]'
                                    />
                                <Input 
                                    label='Enter your PAN Number*'
                                    name="pan" placeholder="XX-XX-XXX"
                                    className='w-full sm:w-[48%]'
                                />
                            </div>
                        </div>
                        <div className="space-y-6 border-b-[2px] border-newGray pb-6">
                            <p className="input-parent-state flex flex-col space-y-1 w-full mt-4">
                                <label className="font-ambit-regular text-lg label-state">
                                    {`We'd love to know who you are donating to`}
                                </label>
                                <select className="input-state" name="state">
                                    <option className="!text-[#A9AEB6]">
                                        {`I'm donating to..`}
                                    </option>
                                    <option>
                                        A
                                    </option>
                                    <option>
                                        B
                                    </option>
                                </select>
                            </p>
                        </div>
                        <div className="space-y-6">
                            <p className="input-parent-state flex flex-col space-y-1 w-full mt-4">
                                <label className="font-ambit-regular text-lg label-state">
                                    {`How did you hear about Akanksha?`}
                                </label>
                                <select className="input-state" name="state">
                                    <option className="!text-[#A9AEB6]">
                                        {`Others..`}
                                    </option>
                                    <option>
                                        A
                                    </option>
                                    <option>
                                        B
                                    </option>
                                </select>
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-8 mt-16 pb-24">
                            <button
                                type="submit"
                                className={`
                                        bg-deep-green text-cream border border-black transition-all 
                                    w-fit text-3xl rounded-full py-6 px-24 ${isDisabled ? 'opacity-55' : `hover:bg-bright-yellow hover:text-deep-green hover:scale-95
                                    hover:border-black hover:border-solid`}
                                    `}
                                disabled={isDisabled}
                            >
                                Proceed
                            </button>
                            <p className="text-deep-green font-ambit-semibold text-lg w-full sm:w-[90%] text-center">
                                Akanksha provides an Online Payment Gateway through BillDesk to make your donation to us easy, secure and efficient. The BillDesk Payment Gateway uses 128-bit SSL encrypted, highly secure transmission protocols and has been Verisign certified. This ensures that your payment is processed securely.
                            </p>
                            <p className="text-deep-green font-ambit-semibold text-lg w-full sm:w-[90%] text-center">
                            By sharing your details, you agree to receive stories and updates from Akanksha via mobile,  Whatsapp, landline, email and post. If you’d like to change this, please send us an email on 
                            &nbsp;<a className="underline transition-all hover:opacity-40" href="mailto:fundraise@akanksha.org">fundraise@akanksha.org</a></p>
                        </div> 
                    </div>
                </div>
            </form>
        </div>
    )
}