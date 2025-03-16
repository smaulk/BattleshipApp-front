import NotifyService from "@/services/NotifyService.ts";

export async function handleApiResponse<T>(apiCall: Promise<T>): Promise<T> {
  try {
    return await apiCall;
  } catch (error: any) {
    NotifyService.error(error.response?.data?.message || 'Произошла ошибка');
    return error.response;
  }
}