import { emailValidation } from "@/services/ValidationService.ts";
import NotifyService from "@/services/NotifyService.ts";
import { apiForgotPassword } from "@/api/password.ts";

async function forgotPassword(email: string): Promise<boolean> {
  if (!emailValidation(email)) {
    return false;
  }

  const response = await apiForgotPassword(email);
  if (response.status === 204) {
    NotifyService.success("Вам было отправлено письмо для сброса пароля");
    return true;
  }
  return false;
}

export {
  forgotPassword,
}