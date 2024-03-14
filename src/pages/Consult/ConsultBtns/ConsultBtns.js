import Button from "../../../component/Button/Button";
import React from "react";

const ConsultBtns = ({ handleNumClick }) => {
    return (
        <div className="ConsultBtns">
            <div className="bt1">
                <Button btnName={'cateBtn'} btnText={'음식'} btnClick={() => { handleNumClick(0) }} />
                <Button btnName={'cateBtn'} btnText={'질병'} btnClick={() => { handleNumClick(1) }} />
                <Button btnName={'cateBtn'} btnText={'응급처치'} btnClick={() => { handleNumClick(2) }} />
            </div>
            <div className="bt2">
                <Button btnName={'cateBtn'} btnText={'예방접종'} btnClick={() => { handleNumClick(3) }} />
                <Button btnName={'cateBtn'} btnText={'훈련/사회화'} btnClick={() => { handleNumClick(4) }} />
                <Button btnName={'cateBtn'} btnText={'임신'} btnClick={() => { handleNumClick(5) }} />
            </div>
        </div>
    );
}
export default ConsultBtns;