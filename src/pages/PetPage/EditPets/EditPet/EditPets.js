import PetBirthCalendar from "../PetBirthCalendar/PetBirthCalendar";
import PetProfileInfo from "../PetProfileInfo/PetProfileInfo";
import PetProfile from "../PetProfile/PetProfile";
import Button from "../../../../component/Button/Button";
import "./EditPets.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimalListDispatch } from "../../../../App";

const Editpets = ({ isEdit, originData }) => {
    const navigate = useNavigate();
    const [petKind, setPetKind] = useState('');
    const [petName, setPetName] = useState('');
    const [petGender, setPetGender] = useState('남');
    const [petDisease, setPetDisease] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [isMale, setIsMale] = useState(true);
    const [isFemale, setIsFemale] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const { onCreate, onEdit } = useContext(AnimalListDispatch);

    const handlePetKind = (e) => {
        setPetKind(e.target.value);
    };
    const handlePetName = (e) => {
        setPetName(e.target.value);
    };
    const handlePetGender = (btn) => {
        setPetGender(btn);
    };
    const handlePetWeight = (e) => {
        setPetWeight(e.target.value);
    };
    const handlePetDisease = (e) => {
        setPetDisease(e.target.value);
    };

    // 반려동물 이미지 업로드
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (petGender === '남') {
            setIsMale(true)
            setIsFemale(false)
        } else {
            setIsMale(false)
            setIsFemale(true)
        };
    }, [petGender]);

    // 등록하기 버튼
    const handleSubmit = () => {
        if (window.confirm(isEdit ? '반려동물을 수정하시겠습니까?' : '반려동물을 추가하시겠습니까?')) {
            if (!isEdit) {
                if (petKind.length === 0) {
                    alert('종을 입력해주세요.');
                    return;
                } else if (petName.length === 0) {
                    alert('이름을 입력해주세요.');
                    return;
                } else if (petWeight.length === 0) {
                    alert('몸무게를 입력해주세요.');
                    return;
                };
                alert("등록되었습니다.");
                onCreate(petName, petKind, petGender, date, petWeight, petDisease, selectedImage);
            } else {
                if (petKind.length === 0) {
                    alert('종을 입력해주세요.');
                    return;
                } else if (petName.length === 0) {
                    alert('이름을 입력해주세요.');
                    return;
                } else if (petWeight.length === 0) {
                    alert('몸무게를 입력해주세요.');
                    return;
                };
                alert("등록되었습니다.");
                onEdit(originData.pet_id, petName, petKind, petGender, date, petWeight, petDisease);
            }
        }
        navigate('/PetPage');
    }

    useEffect(() => {
        if (isEdit) {
            setPetKind(originData.pet_breed)
            setPetName(originData.pet_name)
            setPetGender(originData.pet_sex)
            setPetDisease(originData.pet_disease)
            setPetWeight(originData.pet_weight)
            setSelectedImage(originData.pet_photo)
        }
    }, [originData, isEdit]);

    return (
        <div className="EditPets">
            <Button btnText={<span className="material-symbols-outlined back_icon">arrow_back</span>} btnClick={() => { navigate(-1) }} />
            <PetProfile
                petKind={petKind}
                petName={petName}
                handlePetKind={handlePetKind}
                handlePetName={handlePetName}
                handleImageChange={handleImageChange}
                selectedImage={selectedImage}
            />
            <PetBirthCalendar
                petName={petName}
                date={date}
                setDate={setDate}
            />
            <PetProfileInfo
                isMale={isMale}
                isFemale={isFemale}
                petDisease={petDisease}
                petWeight={petWeight}
                handlePetGender={handlePetGender}
                handlePetDisease={handlePetDisease}
                handlePetWeight={handlePetWeight}
            />
            <Button
                btnClick={handleSubmit}
                btnText={isEdit ? '' : '등록하기'}
                btnName={isEdit ? 'noBtn' : 'addBtn btns'}
            />
            <div className="editBtns">
                <Button
                    btnClick={() => navigate('/petpage')}
                    btnText={isEdit ? '수정취소' : ''}
                    btnName={isEdit ? 'editBtn btns' : ''}
                />
                <Button
                    btnClick={handleSubmit}
                    btnText={isEdit ? '수정하기' : ''}
                    btnName={isEdit ? 'editBtn btns' : ''}
                />
            </div>
        </div>
    );
}
export default Editpets; 