import './App.css';
import { PopupModal, IPopupSubmitValues } from './PopupModal';

const shopLogo =  require('./assets//shop-logo.png');

export default function App() {
  const handleSubmit = (data: IPopupSubmitValues) => {
    console.log(data);
  };

  return (
    <div className='overlay'>
      <PopupModal
        shopTitle={'Shop Name'}
        shopCurrency='&yen;'
        paidAmount={99.99}
        termsUrl={'#'}
        shopImageUrl={shopLogo}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
