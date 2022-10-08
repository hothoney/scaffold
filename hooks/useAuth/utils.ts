export const parseToken = (token: string | null) => {
  if (!token) {
    return false;
  }
  try {
    JSON.parse(window.atob(token));
    return JSON.parse(window.atob(token));
  } catch (error) {
    console.warn('parse token failed');
    return false;
  }
};
