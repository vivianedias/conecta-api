import React from 'react'
import './CustomSelect.scss'

const CustomSelect = (
  {
    label = '',
    selectWrapperClasses = undefined,
    error = undefined,
    name = '',
    onChange,
    selectClasses = undefined,
    value,
    firstValue = '',
    options = [],
    isEdit,
    project
  }) => {
  return (
    <div className='custom-select'>
      <div className='custom-select__field field'>
        {!project &&
        <label
          className='custom-select__label label'
        >
          {label}
        </label>
        }
        {isEdit && (
          <div className='custom-select__wrapper'>
            <div className='custom-select__control control'>
              <div
                className={`select ${selectWrapperClasses} 
									${error
            ? 'is-focused is-danger'
            : ''
          }`}
              >
                <select
                  name={name}
                  onChange={onChange}
                  className={`custom-select__select ${selectClasses || ''}`}
                  value={value}
                >
                  <option value=''>{firstValue}</option>
                  {options.map((option, i) => {
                    return (
                      <option
                        key={i}
                      >
                        {option}
                      </option>
                    )
                  })}
                </select>
              </div>
              {error && <p className='help is-danger'>{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomSelect
