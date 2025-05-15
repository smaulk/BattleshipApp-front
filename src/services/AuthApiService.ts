import { apiLogin, apiRefresh } from "@/api/auth";
import { AxiosLogin, LoginResponse, PayloadAccessToken } from "@/interfaces/Auth";
import NotifyService from "@/services/NotifyService.ts";
import { emailValidation, expValidation } from "@/services/ValidationService.ts";
import { connectChannelEvents, connectChannelOnline } from "@/helpers/socket.ts";

/**
 * Авторизация
 */
async function login(email: string, password: string): Promise<boolean> {
  if (!emailValidation(email)) {
    return false;
  }

  const response: AxiosLogin = await apiLogin(email, password);
  if (response.status === 200) {
    saveAuthData(response.data);
    NotifyService.success("Успешный вход")
    return true;
  }
  return false;
}

/**
 * Выход из аккаунта
 */
function logout(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userNickname');
  localStorage.removeItem('userAvatarUrl');
  sendAuthEvent(null, null, null);
  Object.keys(window.Echo.connector.channels).forEach(channel => {
    window.Echo.leave(channel);
  });
}


/**
 * Проверка авторизации
 */
async function checkAuth(): Promise<boolean> {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const refreshToken: string | null = localStorage.getItem('refreshToken');
  if (!accessToken || !refreshToken) {
    return false;
  }
  const payload: PayloadAccessToken = getPayload(accessToken);

  return expValidation(payload.exp, 60) || await refresh(refreshToken);
}

/**
 * Обновляет пару токенов, используя refresh токен
 */
async function refresh(refreshToken: string): Promise<boolean> {
  const response: AxiosLogin = await apiRefresh(refreshToken);
  if (response.status === 200) {
    saveAuthData(response.data);
    return true;
  }
  logout();
  return false;
}

/**
 * Сохраняет данные авторизации: токены, ID, nickname, avatarUrl
 */
function saveAuthData(data: LoginResponse): void {
  const payload: PayloadAccessToken = getPayload(data.accessToken);
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('userId', String(payload.id));
  localStorage.setItem('userNickname', String(payload.nickname));
  localStorage.setItem('userAvatarUrl', payload.avatarUrl ? String(payload.avatarUrl) : '');
  sendAuthEvent(payload.id, payload.nickname, payload.avatarUrl);

  connectChannelOnline(payload.id);
  connectChannelEvents(payload.id);
}

/**
 * Возвращает полезную нагрузку токена
 */
function getPayload(accessToken: string): PayloadAccessToken {
  const decodedPayload: string = atob(accessToken.split('.')[1]);
  return JSON.parse(decodedPayload);
}

function sendAuthEvent(userId: number | null, nickname: string | null, avatarUrl: string | null): void {
  window.dispatchEvent(new CustomEvent('auth', {
    detail: {
      userId: userId,
      nickname: nickname,
      avatarUrl: avatarUrl,
    }
  }));
}

export {
  login,
  logout,
  refresh,
  checkAuth,
};

