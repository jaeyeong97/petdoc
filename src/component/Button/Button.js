const Button = ({ btnText, btnClick, btnName, btnImg, btnValue, isSelected }) => {
    return (
        <button className={`btn ${btnName} ${isSelected ? 'selected' : ''}`} onClick={btnClick} value={btnValue}>
            {btnText}
            <img src={btnImg} />
        </button>
    );
}
export default Button;