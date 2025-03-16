import validator from 'validator';
import NotifyService from "@/services/NotifyService.ts";

export function nicknameValidation(nickname: string): boolean {
  if (nickname.length < 3) {
    NotifyService.error('Никнейм должен содержать не менее 3 символов');
    return false;
  }
  if (nickname.length > 18) {
    NotifyService.error('Никнейм должен содержать не более 18 символов');
    return false;
  }

  return true;
}

export function emailValidation(email: string): boolean {
  if (!validator.isEmail(email)) {
    NotifyService.error('Неверный формат электронной почты');
    return false;
  }

  return true;
}

export function passwordValidation(password: string, passwordConfirmation: string): boolean {
  if (password.length < 8) {
    NotifyService.error('Пароль должен содержать не менее 8 символов');
    return false;
  }

  if (!validator.isAlphanumeric(password)) {
    NotifyService.error('Пароль должен содержать как буквы, так и цифры');
    return false;
  }

  if (password !== passwordConfirmation) {
    NotifyService.error('Пароли не совпадают');
    return false;
  }

  return true;
}