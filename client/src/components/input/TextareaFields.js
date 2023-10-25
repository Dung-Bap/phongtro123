import React from 'react';

const TextareaFields = ({ label, registername, onChange, errorName, withFull }) => {
    return (
        <div className={`w-full flex flex-col`}>
            <label className="font-semibold">{label}</label>
            <textarea
                className="border border-gray-300 rounded-md min-h-[200px]"
                {...registername}
                onChange={onChange}
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

export default TextareaFields;
