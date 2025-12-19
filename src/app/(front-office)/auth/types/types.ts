export interface ISignup {
  fullname: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ILogin {
  phone: string;
  password: string;
}
