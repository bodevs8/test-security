export const formatUsername = (
  username: string,
  brandCode: string | null | undefined = process.env.NEXT_PUBLIC_BRAND_CODE,
) => {
  if (!brandCode || !username) return username;

  const prefix = `${brandCode}_`;
  return username.startsWith(prefix) ? username.slice(prefix.length) : username;
};
