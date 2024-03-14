import Button from "../../../../component/Button/Button";
import "./PetProfileInfo.css";

const PetProfileInfo = ({ handlePetGender, isMale, isFemale, petWeight, handlePetWeight, petDisease, handlePetDisease }) => {
   return (
      <div className="PetProfileInfo">
         <div className="petGender">
            <Button
               btnText={'남'}
               btnName={isMale ? 'btn' : 'initial'}
               btnClick={() => { handlePetGender('남') }}
            />
            <Button
               btnText={'여'}
               btnName={isFemale ? 'btn' : 'initial'}
               btnClick={() => { handlePetGender('여') }}
            />
         </div>
         <div className="petWeightWrap">
            <span>몸무게 :</span>
            <input
               className="weight"
               value={petWeight}
               onChange={handlePetWeight}
               placeholder="몸무게를 입력해주세요."
            />
            <span>kg</span>
         </div>
         <div className="petDiseaseWrap">
            <span>질병이력</span>
            <textarea value={petDisease} onChange={handlePetDisease} placeholder="질병이력을 입력해주세요(선택)" />
         </div>
      </div>
   );
}
export default PetProfileInfo;