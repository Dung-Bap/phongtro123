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
    multiple,
    onChange,
    readOnly,
    des,
    note,
    value,
}) => {
    return (
        <div className={clsx(withFull ? 'w-[550px]' : '', 'mb-[20px] flex flex-col')}>
            <label className="font-semibold">{label}</label>
            {!note && (
                <input
                    className={clsx(readOnly && 'bg-[#e2e3e5]', 'form-input rounded-md')}
                    {...registername}
                    placeholder={placeholder}
                    type={type ? type : 'text'}
                    defaultValue={defaultValue}
                    multiple={multiple}
                    onChange={onChange}
                    readOnly={readOnly}
                    value={value}
                />
            )}
            {note && (
                <div className="flex ">
                    <input
                        className={clsx(readOnly && 'bg-[#e2e3e5]', 'form-input rounded-l-md')}
                        {...registername}
                        placeholder={placeholder}
                        type={type ? type : 'text'}
                        defaultValue={defaultValue}
                        multiple={multiple}
                        onChange={onChange}
                        readOnly={readOnly}
                    />
                    {<span className="p-[6px] rounded-r-md bg-gray-200 ">{note}</span>}
                </div>
            )}
            {des && <span className="text-[11px] text-gray-500">{des}</span>}
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
