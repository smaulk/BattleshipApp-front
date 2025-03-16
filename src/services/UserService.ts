import { CreateUser } from "@/interfaces/User.ts";
import NotifyService from "@/services/NotifyService.ts";
import { apiCreateUser } from "@/api/user.ts";
import { emailValidation, nicknameValidation, passwordValidation } from "@/services/ValidationService.ts";


async function createUser(userData: CreateUser): Promise<boolean> {
  if (!(nicknameValidation(userData.nickname)
    && emailValidation(userData.email)
    && passwordValidation(userData.password, userData.passwordConfirmation))) {
    return false;
  }

  const response = await apiCreateUser(userData);
  if (response.status === 201) {
    NotifyService.success("Успешная регистрация");
    return true;
  }
  return false;
}



export {
  createUser,
}