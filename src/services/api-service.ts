import { requestInterceptor, responseInterceptor } from './interceptors';

export async function apiFetch<T>(
  url: string,
  options: RequestInit & {
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
  } = {},
): Promise<T> {
  try {
    const fullUrl = new URL(url, process.env.__NEXT_PRIVATE_ORIGIN).toString();
    const config = await requestInterceptor({ ...options, url: fullUrl });
    const response = await fetch(fullUrl, config);
    return await responseInterceptor<T>(response);
  } catch (error) {
    console.error('API Fetch Error:', { ...(error as any), url });
    throw error;
  }
}

export async function get<T>(
  url: string,
  params = {},
  options: RequestInit = {},
) {
  const searchParams =
    Object.keys(params).length > 0
      ? new URLSearchParams(params).toString()
      : '';
  if (searchParams) {
    url = `${url}?${searchParams}`;
  }
  return apiFetch<T>(url, {
    ...options,
    method: 'GET',
    cache: options.cache || 'force-cache',
  });
}

export async function post<T>(
  url: string,
  data: any,
  options: RequestInit = {},
) {
  return apiFetch<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}
