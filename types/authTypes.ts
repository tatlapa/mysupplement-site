export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  password_confirmation: string;
  hostname: string;
}

export interface UpdateProfileForm {
  email: string;
}

export interface UpdatePasswordForm {
  current_password?: string;
  password: string;
  password_confirmation: string;
}

export interface DeleteUser {
  password: string;
}

export interface FormErrors {
  // Erreurs de validation Laravel 422 (par champ)
  email?: string[];
  password?: string[];
  current_password?: string[];
  login?: string[];
  secret_question?: string[];
  password_confirmation?: string[];

  // Erreurs globales par formulaire (pas liées à un champ)
  register_global?: string;
  login_global?: string;
  updateProfile_global?: string;
  updatePassword_global?: string;
  deleteUser_global?: string;
  forgetPassword_global?: string;
  resetPassword_global?: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  has_password?: boolean;
}

export interface ApiResponseUser {
  access_token: string;
  user: User;
}

export interface ApiError {
  status: number;
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
}
