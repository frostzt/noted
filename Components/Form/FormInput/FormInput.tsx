import React from 'react';
import cx from 'classnames';

interface FormInputProps {
  type: string;
  value: string;
  name?: string;
  label?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  setValue: (e: React.ChangeEvent<any>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  value,
  setValue,
  placeholder,
  label,
  name,
  type,
  className,
  required,
  disabled,
}) => {
  return (
    <div className={cx([className || null])}>
      {label && (
        <label htmlFor={name} className="block text-base font-medium text-slate-50">
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          value={value}
          onChange={setValue}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="placeholder:italic placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md outline-none py-2 px-4"
        />
      </div>
    </div>
  );
};

export default FormInput;
