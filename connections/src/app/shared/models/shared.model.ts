export interface KeyString {
  [key: string]: string;
}

export interface AuthBody {
  name?: string;
  email: string;
  password: string;
}

export interface ProfileNameBody {
  name: string;
}

export interface TokenHeaders {
  token: string;
  uid: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  uid: string;
}

export interface ProfileInfo {
  email: SField;
  name: SField;
  uid: SField;
  createdAt: SField;
}

export interface SField {
  S: string;
}
