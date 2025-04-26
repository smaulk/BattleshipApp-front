export interface UpdatePasswordData {
  currentPassword: string,
  newPassword: string,
  newPasswordConfirmation: string,
}

export interface ResetPasswordData {
  token: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}