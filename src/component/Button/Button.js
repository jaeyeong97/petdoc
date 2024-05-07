const Button = ({ btnText, btnClick, btnName, btnImg, btnValue, isSelected }) => {
    return (
        <button className={`btn ${btnName} ${isSelected ? 'selected' : ''}`} onClick={btnClick} value={btnValue}>
            {btnText}
            {btnImg && <img src={btnImg} alt="버튼이미지" />}
        </button>
    );
}
export default Button;