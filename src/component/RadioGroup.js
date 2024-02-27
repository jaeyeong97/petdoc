import RadioContext from "./RadioContext";

const RadioGroup = ({ label, children, className, ...rest }) => {
    return (
        <fieldset className={`radioGroup ${className}`}>
            <legend>
                <p>{label}</p>
                <RadioContext.Provider value={rest} >
                    {children}
                </RadioContext.Provider>
            </legend>
        </fieldset>
    );
};
export default RadioGroup;
