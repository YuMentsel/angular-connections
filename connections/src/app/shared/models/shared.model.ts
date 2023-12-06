export interface KeyString {
  [key: string]: string;
}

export interface AuthBody {
  name?: string;
  email: string;
  password: string;
}
