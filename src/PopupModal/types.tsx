export interface IPopupSubmitValues {
  email: string;
  phoneNumber: string;
}

export interface IPopupModalProps {
  shopTitle: string;
  shopCurrency: string;
  paidAmount: number;
  termsUrl: string;
  shopImageUrl: string;
  onSubmit: (values: IPopupSubmitValues) => void
}
