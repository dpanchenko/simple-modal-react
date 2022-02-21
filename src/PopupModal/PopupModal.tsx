import './styles.css';

import { ReactElement, FormEvent, ChangeEvent, useState } from 'react';
import { IPopupModalProps, IPopupSubmitValues  } from './types';

const formatPhoneNumber = (phoneNumber: string): string => 
  `${phoneNumber.slice(0,3)}` +
  `${phoneNumber.length > 3 ? '-' + phoneNumber.slice(3,7) : ''}` +
  `${phoneNumber.length > 7 ? '-' + phoneNumber.slice(7) : ''}`;

export const PopupModal = (props: IPopupModalProps): ReactElement => {
  const { 
    shopTitle = '',
    shopCurrency = '',
    paidAmount = 0,
    termsUrl = '',
    shopImageUrl = '',
    onSubmit = () => {},
  } = props || {};
  const [ email, setEmail ] = useState('');
  const [ isPhoneValid, setIsPhoneValid ] = useState(true);
  const [ isEmailValid, setIsEmailValid ] = useState(true);
  const [ phoneNumber, setPhoneNumber ] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IPopupSubmitValues = {
      email,
      phoneNumber,
    };
    
    onSubmit(data);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/[^0-9.]/g, '').slice(0, 11);
    setPhoneNumber(phoneNumber);
    setIsPhoneValid(phoneNumber.length === 11);
  }
  const isFormValid = (): boolean => isPhoneValid && isEmailValid;
  
  return (
    <div className='emailPopup'>
      
      <div className='emailPopupHeader'>
        <div className='emailPopupHeader-info'>
          <h3 className='emailPopupHeader-name'>{shopTitle}</h3>
          <span className='emailPopupHeader-total'>
            {shopCurrency} {paidAmount.toFixed(2)}
          </span>
        </div>
        <a href='/' className='emailPopupHeader-logo'>
          <img
            src={shopImageUrl}
            alt={shopTitle}
            className='emailPopupHeader-logoImg'
          />
        </a>
      </div>

      <div className='emailPopupBody'>
        <form className='emailPopupForm' onSubmit={handleSubmit}>

          <section className='emailPopupForm-body'>
            <div className='emailPopupFormRow'>
              <label className='emailPopuplabel'>メールアドレス</label>
              <input 
                type='email' 
                placeholder='email@email.com'
                className={!isEmailValid ? 'emailPopupInput invalid' : 'emailPopupInput'} 
                value={email} 
                onChange={handleEmailChange}
              />
            </div>
            <div className='emailPopupFormRow'>
              <label className='emailPopuplabel'>携帯電話番号</label>
              <input 
                type='tel'
                placeholder='###-####-####'
                className={!isPhoneValid ? 'emailPopupInput invalid' : 'emailPopupInput'}
                value={formatPhoneNumber(phoneNumber)}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className='emailPopupFormRow'>
              <label className='checkbox'>
                <input type='checkbox' className='checkbox-input' />
                <i className='checkbox-icon'></i>
                <span className='checkbox-text'>
                  <a href={termsUrl} className='emailPopupLink'>
                    利用規約・個人情報取扱条項
                  </a>
                  に同意して
                </span>
              </label>
            </div>
          </section>

          <section className='emailPopupForm-footer'>
            <button
              type='submit'
              className='emailPopupButton emailPopupButton_submit'
              disabled={!isFormValid()}
            >
              次へ
            </button>
          </section>

        </form>
      </div>
    </div>
  );
};
