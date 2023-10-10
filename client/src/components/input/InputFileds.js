import React from 'react';

const InputFileds = ({
    placeholder,
    registername,
    errorName,
    type,
    withFull,
    defaultValue,
    label,
    invalidRed,
    multiple,
}) => {
    return (
        <div className={` mb-[20px] flex flex-col `}>
            <label>{label}</label>
            <input
                className={`form-input ${
                    withFull ? 'w-full' : 'w-[400px]'
                } px-[6px] text-[14px] py-[4px] placeholder:text-[14px] bg-blue-100 rounded-md min-h-[45px] text-[#1c1d1d] placeholder:border-none focus:outline-none`}
                {...registername}
                placeholder={placeholder}
                type={type ? type : 'text'}
                defaultValue={defaultValue}
                multiple={multiple}
            />
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

export default InputFileds;
