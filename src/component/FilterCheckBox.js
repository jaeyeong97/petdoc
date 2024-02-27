const FilterCheckBox = ({value, check, onChange, onClick}) => {
    return (
        <div className="FilterCheckBox" onClick={onClick}>
            <input
                type="checkbox"
                value={`${value}`}
                name={'animals'}
                id={value}
                checked={check}
                onChange={e => { onChange(e.target.id, e.target.checked) }}
            />
            <label htmlFor={value}>{value}</label>
        </div>
    )
}

export default FilterCheckBox;