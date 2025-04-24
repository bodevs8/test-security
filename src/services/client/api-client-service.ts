import { StatusCodeEnum } from '@/enums';
import { toast } from 'sonner';

class ApiError extends Error {
  status: any;
  constructor(message: string, status: any) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(
  urlPath: string,
  options: RequestInit & {
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
  } = {},
): Promise<T> {
  try {
    const fullUrl = new URL(urlPath, window.origin).toString();
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Accept-encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
        ...options.headers,
        'Cache-Control': 'no-cache',
      },
    });
    return responseInterceptor(response);
  } catch (error) {
    console.error('API Fetch Error:', { ...(error as any), urlPath });
    throw error;
  }
}

async function responseInterceptor<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type');
  // const userStore = useUserStore(state => state);
  let res;

  if (contentType?.includes('text/')) {
    res = (await response.text()) as T;
  } else if (contentType?.includes('application/octet-stream')) {
    res = (await response.blob()) as T;
  } else {
    res = await response.json();
  }
  if (response.ok) {
    return res;
  }
  if (response.status === StatusCodeEnum.Unauthorized) {
    toast.error(
      'Tài khoản của bạn đã được đăng nhập trên trình duyệt hoặc thiết bị khác.',
    );
    setTimeout(
      () => {
        window.location.href = '/';
      },
      Number(process.env.NEXT_PUBLIC_AUTO_REDIRECT_TIME || 3000),
    );
  }

  throw new ApiError(res?.message || '', res?.status);
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
    next: {
      revalidate: 0,
    },
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
