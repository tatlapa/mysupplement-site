// types/authTypes.ts

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  hostname: string;
}

export interface UpdateProfileForm {
  name: string;
  email: string;
}

export interface UpdatePasswordForm {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface FormErrors {
  name: string[];
  email: string[];
  password: string[];
  login: string[];
  secret_question: string[];
  password_confirmation: string[];
  global: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  ogrine: number;
}

export interface ApiResponseUser {
  access_token: string;
  user: User;
}

export interface ApiError {
  status: number;
  data: {
    errors: {
      name: string[];
      email: string[];
      password: string[];
      password_confirmation: string[];
    };
  };
  message: string;
}
