import { useContext } from "react";
import RadioContext from "./RadioContext";

const Radio = ({
    className,
    name,
    value,
    disabled,
    children,
}) => {
    const group = useContext(RadioContext);

    return (
        <label>
            <input
                className={`radio ${className}`}
                type="radio"
                name={name}
                value={value}
                disabled={disabled || group.disabled}
                checked={group.value !== undefined ? value === group.value : undefined}
                onChange={(e) => group.onChange && group.onChange(e.target.value)}
            />
            {children}
        </label>
    );
};
export default Radio;
