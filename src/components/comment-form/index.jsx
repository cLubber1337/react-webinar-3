import './style.css'
import {Textarea} from "../textarea";
import PropTypes from "prop-types";
import {forwardRef, memo, useState} from "react";


export const CommentForm = memo(forwardRef(({
                                   isAuth,
                                   values,
                                   onHide,
                                   onSubmit,
                                   disabled,
                                   onSignIn,
                                   style = {},
                                 }, ref) => {
  const [value, setValue] = useState('');
  const isAnswer = values.name === 'new-answer';

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let text = value.trim();
    if (text === '') {
      return;
    }
    onSubmit(text);
    setValue('');
  }

  return (
    <>
      {!isAuth ?
        <p className='not-authorized' style={style} ref={ref}>
          <button className='not-authorized-link' onClick={onSignIn}>
            Войдите
          </button>
          , {values.text}
          {isAnswer && <span onClick={onHide} className='not-authorized-link cancel-link'>Отмена</span>}
        </p>
        :
        <form className='comment-form' onSubmit={onSubmitHandler} style={style} ref={ref}>
          {values.label &&
            <label className='comment-form-label' htmlFor={values.id}>
              {values.label}
            </label>}
          <Textarea id={values.id}
                    name={values.name}
                    required={values.required}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    disabled={disabled}
          />
          <div className='comment-form-actions'>
            <button disabled={disabled} type='submit'>Отправить</button>
            {isAnswer && <button disabled={disabled} onClick={onHide}>Отмена</button>}
          </div>
        </form>
      }
    </>
  )
}))

CommentForm.propTypes = {
  isAuth: PropTypes.bool,
  values: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    text: PropTypes.string
  }),
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  onSignIn: PropTypes.func
}