export interface KeyString {
  [key: string]: string;
}

export interface AuthBody {
  name?: string;
  email: string;
  password: string;
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
  email: {
    S: 'string';
  };
  name: {
    S: 'string';
  };
  uid: {
    S: 'string';
  };
  createdAt: {
    S: 'string';
  };
}
