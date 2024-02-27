import { useContext, useState } from "react";
import { AnimalListDispatch } from "../App";
import moment from "moment";

import "../css/PetRecord.css";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

const PetRecord = ({
    calValue,
    pet_id,
}) => {
    const { onSymptomAdd } = useContext(AnimalListDispatch);

    const [cough, setCough] = useState("1~3회"); //기침
    const [runningNose, setRunningNose] = useState("투명함");
    const [hunger, setHunger] = useState("감소");
    const [urine, setUrine] = useState("0~2회");
    const [excrement, setExcrement] = useState("0회");
    const [temperature, setTemperature] = useState("낮음");
    const [active, setActive] = useState("거의 없음"); 
    const [misc, setMisc] = useState(""); //텍스트

    const handleMiscChange = (e) => {
        setMisc(e.target.value)
    }
    
    const handleSymptomAdd = () => {
        onSymptomAdd(pet_id, moment(calValue).format('YYYY/MM/DD'), cough, runningNose, hunger, urine,excrement, temperature, active, misc );
        window.confirm("증상들을 올바르게 입력하셨습니까?");
    };

    return (
        <div className="PetRecord">
            <RadioGroup
                className="cough"
                label={"기침"}
                value={cough}
                onChange={setCough}
            >
                <Radio name={"cough"} value={"1~3회"} defaultChecked>
                    1~3회
                </Radio>
                <Radio name={"cough"} value={"4~6회"}>
                    4~6회
                </Radio>
                <Radio name={"cough"} value={"7회 이상"}>
                    7회 이상
                </Radio>
            </RadioGroup>
            <RadioGroup
                className={"runningNose"}
                label={"콧물"}
                value={runningNose}
                onChange={setRunningNose}
            >
                <Radio name={"runningNose"} value={"투명함"} defaultChecked>
                    투명함
                </Radio>
                <Radio name={"runningNose"} value={"노란색"}>
                    노란색
                </Radio>
                <Radio name={"runningNose"} value={"붉은색"}>
                    붉은색
                </Radio>
            </RadioGroup>
            <RadioGroup
                className={"hunger"}
                label={"식욕"}
                value={hunger}
                onChange={setHunger}
            >
                <Radio name={"hunger"} value={"감소"} defaultChecked>
                    감소
                </Radio>
                <Radio name={"hunger"} value={"보통"}>
                    보통
                </Radio>
                <Radio name={"hunger"} value={"증가"}>
                    증가
                </Radio>
            </RadioGroup>
            <RadioGroup
                className={"urine"}
                label={"소변"}
                value={urine}
                onChange={setUrine}
            >
                <Radio name={"urine"} value={"0~2회"} defaultChecked>
                    0~2회
                </Radio>
                <Radio name={"urine"} value={"3~6회"}>
                    3~6회
                </Radio>
                <Radio name={"urine"} value={"7회 이상"}>
                    7회 이상
                </Radio>
            </RadioGroup>
            <RadioGroup
                className={"excrement"}
                label={"대변"}
                value={excrement}
                onChange={setExcrement}
            >
                <Radio name={"excrement"} value={"0회"} defaultChecked>
                    0회
                </Radio>
                <Radio name={"excrement"} value={"1~2회"}>
                    1~2회
                </Radio>
                <Radio name={"excrement"} value={"3회 이상"}>
                    3회 이상
                </Radio>
            </RadioGroup>
            <RadioGroup
                className={"temperature"}
                label={"체온"}
                value={temperature}
                onChange={setTemperature}
            >
                <Radio name={"temperature"} value={"낮음"} defaultChecked>
                    평균보다<br/>낮음
                </Radio>
                <Radio name={"temperature"} value={"평균"}>
                    평균
                </Radio>
                <Radio name={"temperature"} value={"높음"}>
                    평균보다<br/>높음
                </Radio>
            </RadioGroup>
            <RadioGroup
                className={"active"}
                label={"활동성"}
                value={active}
                onChange={setActive}
            >
                <Radio name={"active"} value={"거의 없음"} defaultChecked>
                    거의 없음
                </Radio>
                <Radio name={"active"} value={"약간 있음"}>
                    약간 있음
                </Radio>
                <Radio name={"active"} value={"활발함"}>
                    활발함
                </Radio>
            </RadioGroup>
            <div className="misc">
                <p>기타</p>
                <input
                    type="text"
                    onChange={handleMiscChange}
                />
            </div>
            <div className="btnSave">
                <button
                    onClick={() => {
                        handleSymptomAdd();
                    }}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
};
export default PetRecord;
