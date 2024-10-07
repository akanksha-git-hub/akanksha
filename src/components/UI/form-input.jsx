

export const FormInput = ({ label, ...props}) => {
    return (
        <div>
            <label>
                {label}
            </label>
            <input 
                {...props}
            />
        </div>
    )
}