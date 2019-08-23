import React from 'react'
import './CustomTextarea.scss'

const CustomTextarea = (
  {
    label = '',
    placeholder = '',
    error = undefined,
    name = '',
    onChange,
    textareaClasses = '',
    value,
    isEdit,
    project
  }) => {
  return (
    <div className='custom-textarea'>
      <div className='custom-textarea__field field'>
        {!project && <label className='custom-textarea__label label'>{label}</label>}
        {isEdit && (
          <div className='custom-textarea__wrapper'>
            <div className='custom-textarea__control control'>
              <textarea
                name={name}
                className={`textarea ${textareaClasses}`}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
              />
              {error && <p className='help is-danger'>{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomTextarea
