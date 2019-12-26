export interface User {
  name: string;
  surname: string;
  city: string;
  company: string;
  email: string;
  password?: string;
  phone: string;
  date: Date;
  id?: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface FbCreateResponse {
  name: string;
}
