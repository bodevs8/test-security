export async function requestInterceptor(
  config: RequestInit & { url: string },
): Promise<RequestInit> {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    } as HeadersInit,
  };
}

export async function responseInterceptor<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type');
  let data: T;

  if (contentType?.includes('text/')) {
    data = (await response.text()) as T;
  } else if (contentType?.includes('application/octet-stream')) {
    data = (await response.blob()) as T;
  } else {
    data = await response.json();
  }

  if (!response.ok) {
    throw data;
  }

  return data;
}
