import React from 'react';

const SelectFileds = ({
    registername,
    onChange,
    errorName,
    withFull,
    defaultValue,
    options = [],
    label,
    invalidRed,
    defaultOption,
    type,
}) => {
    return (
        <div className={`w-full flex flex-col`}>
            <label className="font-semibold">{label}</label>
            <select
                className="form-select rounded-md"
                {...registername}
                defaultValue={defaultValue}
                onChange={onChange} // Using setValue
            >
                <option value="">{defaultOption}</option>
                {options?.map(option => (
                    <option
                        key={
                            type === 'provine'
                                ? option.province_id
                                : type === 'district'
                                ? option.district_id
                                : option.code
                        }
                        value={
                            type === 'provine'
                                ? option.province_id
                                : type === 'district'
                                ? option.district_id
                                : option.code
                        }
                    >
                        {type === 'provine'
                            ? option.province_name
                            : type === 'district'
                            ? option.district_name
                            : option.value}
                    </option>
                ))}
            </select>
            <span
                className={`${withFull ? 'w-full' : 'w-[400px]'} ${
                    withFull ? 'text-[12px]' : 'text-sm'
                } font-light text-secondary`}
            >
                {errorName}
            </span>
        </div>
    );
};

export default SelectFileds;
