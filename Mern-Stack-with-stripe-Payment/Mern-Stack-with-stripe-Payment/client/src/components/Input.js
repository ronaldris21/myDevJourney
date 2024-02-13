import React from 'react';
import { InlineError } from './Notifications/Error';

function Input({ label, name, type, placeHolder, register, errors }) {
  return (
    <div className="text-sm">
      <label className="font-normal text-sm">{label}</label>
      <input
        type={type}
        name={name}
        {...register}
        placeholder={placeHolder}
        className="w-full focus:border-gray-300 text-sm mt-2 p-4 border border-gray-200 rounded text-gray-500 bg-white"
      />
      {errors && <InlineError text={errors?.message} />}
    </div>
  );
}

export default Input;
