import "../css/PetProfile.css";

const PetProfile = ({petKind, handlePetKind, petName, handlePetName, handleImageChange, selectedImage}) => {
    return (
        <div className="PetProfile">
            <div className="petFace">
                <input 
                    type="file"
                    onChange={handleImageChange}
                />
                <img src={selectedImage} />
            </div>
            <div className="PetProfileTxt">
                <div className="petKind">
                    <span>종 :</span> 
                    <input 
                        type="text"
                        placeholder="입력해주세요."
                        value={petKind}
                        onChange={handlePetKind}
                    />
                </div>
                <div className="petName">
                    <span>이름 :</span> 
                    <input 
                        type="text"
                        placeholder="입력해주세요."
                        value={petName}
                        onChange={handlePetName}
                    />
                </div>
            </div>
        </div>
    );
}
export default PetProfile;