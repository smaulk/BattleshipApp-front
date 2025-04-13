import { CreateUser, UpdateUser } from "@/interfaces/User.ts";
import NotifyService from "@/services/NotifyService.ts";
import { apiCreateUser, apiDeleteAvatar, apiUpdateAvatar, apiUpdateUser } from "@/api/user.ts";
import { emailValidation, nicknameValidation, passwordValidation } from "@/services/ValidationService.ts";
import { refresh } from "@/services/AuthService.ts"

async function refreshUserStorage(): Promise<void> {
  const refreshToken: string | null = localStorage.getItem('refreshToken');
  if (refreshToken) {
    await refresh(refreshToken);
  }
}

async function createUser(userData: CreateUser): Promise<boolean> {
  if (!(nicknameValidation(userData.nickname)
    && emailValidation(userData.email)
    && passwordValidation(userData.password, userData.passwordConfirmation))) {
    return false;
  }

  const response = await apiCreateUser(userData);
  if (response.status === 201) {
    NotifyService.success("Успешная регистрация!");
    return true;
  }
  return false;
}

async function updateUser(userData: UpdateUser): Promise<boolean> {
  if (!(nicknameValidation(userData.nickname) && emailValidation(userData.email))) {
    return false;
  }

  const response = await apiUpdateUser(userData);
  if (response.status === 201) {
    NotifyService.success('Данные успешно обновлены!');
    return true;
  }
  return false;
}

async function updateAvatar(avatar: File): Promise<boolean> {
  const response = await apiUpdateAvatar(avatar);
  if (response.status === 204) {
    await refreshUserStorage();
    NotifyService.success('Аватар успешно обновлен!');
    return true;
  }
  return false;
}

async function deleteAvatar(): Promise<boolean> {
  const response = await apiDeleteAvatar();
  if (response.status === 204) {
    NotifyService.success('Аватар успешно удален!');
    return true;
  }
  return false;
}

export {
  createUser,
  updateUser,
  updateAvatar,
  deleteAvatar,
}