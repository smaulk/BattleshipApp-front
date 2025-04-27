import { CreateUserData, PaginateUsers, SelfUser, UpdateUserData, User } from "@/interfaces/User.ts";
import NotifyService from "@/services/NotifyService.ts";
import { apiCreateUser, apiDeleteAvatar, apiGetUser, apiGetUsers, apiUpdateAvatar, apiUpdateUser } from "@/api/user.ts";
import { emailValidation, nicknameValidation, passwordValidation } from "@/services/ValidationService.ts";
import { refresh } from "@/services/AuthApiService.ts"
import { PaginateUsersParams } from "@/interfaces/Paginate.ts";

async function refreshUserStorage(): Promise<void> {
  const refreshToken: string | null = localStorage.getItem('refreshToken');
  if (refreshToken) {
    await refresh(refreshToken);
  }
}

async function createUser(userData: CreateUserData): Promise<boolean> {
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

async function updateUser(userData: UpdateUserData): Promise<SelfUser | null> {
  if (!(nicknameValidation(userData.nickname) && emailValidation(userData.email))) {
    return null;
  }

  const response = await apiUpdateUser(userData);
  if (response.status === 200) {
    await refreshUserStorage();
    NotifyService.success('Данные успешно обновлены!');
    return response.data.data;
  }
  return null;
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
    await refreshUserStorage();
    NotifyService.success('Аватар успешно удален!');
    return true;
  }
  return false;
}

async function getUsers(data: PaginateUsersParams): Promise<PaginateUsers | null> {
  const response = await apiGetUsers(data);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

async function getUser(id: number): Promise<User | SelfUser | null> {
  const response = await apiGetUser(id);
  if(response.status === 200) {
    return response.data.data;
  }
  return null;
}

export {
  createUser,
  updateUser,
  updateAvatar,
  deleteAvatar,
  getUsers,
  getUser
}