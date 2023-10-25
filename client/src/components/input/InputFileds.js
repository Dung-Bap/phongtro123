import clsx from 'clsx';
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
    onChange,
    readOnly,
}) => {
    return (
        <div className={` mb-[20px] flex flex-col `}>
            <label className="font-semibold">{label}</label>
            <input
                className={clsx(readOnly && 'bg-[#e2e3e5]', 'form-input')}
                {...registername}
                placeholder={placeholder}
                type={type ? type : 'text'}
                defaultValue={defaultValue}
                multiple={multiple}
                onChange={onChange}
                readOnly={readOnly}
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
