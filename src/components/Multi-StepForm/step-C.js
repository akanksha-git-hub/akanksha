'use client'
import { useCallback, useState } from "react";
import RichText from "../Texts/RichText";
import Input from "./input";
import Data from '../../../countries.json';

const INITIAL_STATE = {
    first_name: '',
    last_name: '',
    email: '',
    number: '',
    country: 'India',
    state: 'Kerala',
    city: '',
    address: '',
    pin_code: '',
    pan_number: '',
    donating_to: '',
    heard_from: ''
}
const ERRORS = {
    first_name: null,
    last_name: null,
    email: null,
    number: null,
    pin_code: null,
    pan_number: null
}

export default function StepC({}) {

    const [errors, setErrors] = useState(ERRORS);
    const [formData, setFormData] = useState(INITIAL_STATE);

    const heardData = ['Social Media', 'Website', 'Friends', 'Other'];
    const jsonData = Data || [];
    const stateData = jsonData.filter(({ name }) => name === 'India') || null;

    const isDisabled = !formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim() ||
                        !formData.number.trim() || !formData.state.trim() || !formData.city.trim() || 
                        !formData.address.trim() || !formData.pin_code.trim() || !formData.pan_number.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(prevState => ({ ...prevState, ...validationErrors }));
        setTimeout(() => {
            setErrors(ERRORS);
        }, 5000);
    }

    const handleChange = useCallback((e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }, [formData]);

    const validate = () => {

        const error = { ...ERRORS };
        const alphabetRegex = /^[A-Za-z\s]+$/;
        const indianNumberRegex = /^(?:\+91\s?|91\s?|0\s?)?[6-9]\d{4}\s?\d{5}$/;
        const pinCodeRegex = /^[1-9][0-9]{2}\s?[0-9]{3}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        
        const testNumber = indianNumberRegex.test(formData.number)
        const testNumberIsAlphabet = alphabetRegex.test(formData.number)

        if(!alphabetRegex.test(formData.first_name)) {
            error.first_name = 'Only Alphabets required';
        }
        
        if(!alphabetRegex.test(formData.last_name)) {
            error.last_name = 'Only Alphabets required';
        }

        if(!pinCodeRegex.test(formData.pin_code)) {
            error.pin_code = 'Invalid Pin code';
        }

        if(alphabetRegex.test(formData.number) === true) {
            error.number = 'Alphabets not allowed';
        } else if(!indianNumberRegex.test(formData.number)) {
            error.number = 'Invalid number';
        }

        if(!emailRegex.test(formData.email)) {
            error.email = 'Invalid email';
        }

        if(!panCardRegex.test(formData.pan_number)) {
            error.pan_number = 'Invalid Pan number';
        }

        return error;
    }

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
                                    onChange={handleChange}
                                    error={errors.first_name}
                                />
                                <Input 
                                    label='Last Name*'
                                    name="last_name" placeholder="Last Name"
                                    className='w-full sm:w-[48%]'
                                    onChange={handleChange}
                                    error={errors.last_name}
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <Input 
                                    label='Email Id*'
                                    name="email" placeholder="Email Id"
                                    className='w-full sm:w-[48%]'
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <Input 
                                    label='Mobile No*'
                                    name="number" placeholder="+91"
                                    className='w-full sm:w-[48%]'
                                    onChange={handleChange}
                                    error={errors.number}
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
                                    <select onChange={handleChange} className="input-state" name="country">
                                        <option selected disabled value={'India'} className="!text-[#A9AEB6]">
                                            India
                                        </option>
                                        {/* {jsonData.map(({ name }) => <option value={name} key={name}>{name}</option>)} */}
                                    </select>
                                </p>
                                <p className="input-parent-state flex flex-col space-y-1 w-full sm:w-[48%]">
                                    <label className="font-ambit-regular text-lg label-state">
                                        Select State*
                                    </label>
                                    <select onChange={handleChange} className="input-state" name="state">
                                        <option className="!text-[#A9AEB6]">
                                            State
                                        </option>
                                        {stateData && (
                                            stateData.map(item => (
                                                item.states.map(({ name }) => <option key={name} value={name}>{name}</option>)
                                            ))
                                        )}
                                    </select>
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <Input 
                                    label='Enter your City*'
                                    name='city' placeholder='City'
                                    className='w-full sm:w-[48%]'
                                    onChange={handleChange}
                                />
                                <Input 
                                    label='Enter your Address*'
                                    name="address" placeholder="Address"
                                    className='w-full sm:w-[48%]'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-between space-y-6 sm:space-y-0">
                                <Input 
                                    label='Enter your Pincode*'
                                    name='pin_code' placeholder='XX-XXX-XX'
                                    className='w-full sm:w-[48%]'
                                    onChange={handleChange}
                                    error={errors.pin_code}
                                />
                                <Input 
                                    label='Enter your PAN Number*'
                                    name="pan_number" placeholder="XX-XX-XXX"
                                    className='w-full sm:w-[48%]'
                                    onChange={handleChange}
                                    error={errors.pan_number}
                                />
                            </div>
                        </div>
                        <div className="space-y-6 border-b-[2px] border-newGray pb-6">
                            <p className="input-parent-state flex flex-col space-y-1 w-full mt-4">
                                <label className="font-ambit-regular text-lg label-state">
                                    {`We'd love to know who you are donating to`}
                                </label>
                                <select className="input-state" name="donate_to">
                                    <option disabled selected value className="!text-[#A9AEB6]">
                                        {`I'm donating to..`}
                                    </option>
                                    <option>
                                        Uninterrupted learning for students and alumni
                                    </option>
                                </select>
                            </p>
                        </div>
                        <div className="space-y-6">
                            <p className="input-parent-state flex flex-col space-y-1 w-full mt-4">
                                <label className="font-ambit-regular text-lg label-state">
                                    {`How did you hear about Akanksha?`}
                                </label>
                                <select onChange={handleChange} className="input-state" name="heard_from">
                                    <option disabled selected value className="!text-[#A9AEB6]">
                                        {`Others..`}
                                    </option>
                                    {heardData.map(item => <option key={item}>{item}</option>)}
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