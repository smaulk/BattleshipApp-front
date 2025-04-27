import { emailValidation, passwordValidation } from "@/services/ValidationService.ts";
import NotifyService from "@/services/NotifyService.ts";
import { apiForgotPassword, apiResetPassword, apiUpdatePassword } from "@/api/password.ts";
import { ResetPasswordData, UpdatePasswordData } from "@/interfaces/Password.ts";

async function updatePassword(data: UpdatePasswordData): Promise<boolean> {
  if (!passwordValidation(data.newPassword, data.newPasswordConfirmation)) {
    return false;
  }

  const response = await apiUpdatePassword(data);
  if (response.status === 204) {
    NotifyService.success('Пароль успешно изменен!');
    return true;
  }
  return false;
}

async function forgotPassword(email: string): Promise<boolean> {
  if (!emailValidation(email)) {
    return false;
  }

  const response = await apiForgotPassword(email);
  if (response.status === 204) {
    NotifyService.success('Вам было отправлено письмо для сброса пароля');
    return true;
  }
  return false;
}

async function resetPassword(data: ResetPasswordData): Promise<boolean> {
  if (!passwordValidation(data.password, data.passwordConfirmation)) {
    return false;
  }

  const response = await apiResetPassword(data);
  if (response.status === 204) {
    NotifyService.success('Пароль успешно сброшен!');
    return true;
  }
  return false;
}

export {
  updatePassword,
  forgotPassword,
  resetPassword,
}