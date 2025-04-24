export function getStorage(key: string) {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage?.getItem(key);
}

export function setStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeStorage(key: string) {
  localStorage.removeItem(key);
}
