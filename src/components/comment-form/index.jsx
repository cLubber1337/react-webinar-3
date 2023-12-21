import './style.css'
import {Textarea} from "../textarea";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {memo, useState} from "react";


export const CommentForm = memo(({isAuth, values, link, onHide, onSubmit, disabled }) => {
  const [value, setValue] = useState('');
  const isAnswer = values.name === 'new-answer';

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  }

  return (
    <>
      {!isAuth ?
        <p className='not-authorized'>
          <Link className='not-authorized-link' to={link}>
            Войдите
          </Link>, {values.text}
          {isAnswer && <span onClick={onHide} className='not-authorized-link cancel-link'>Отмена</span>}
        </p>
        :
        <form className='comment-form' onSubmit={onSubmitHandler}>
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
            { isAnswer && <button disabled={disabled} onClick={onHide}>Отмена</button>}
          </div>
        </form>
      }
    </>
  )
})

CommentForm.propTypes = {
  isAuth: PropTypes.bool,
  values: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    text: PropTypes.string
  }),
  link: PropTypes.string,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool
}