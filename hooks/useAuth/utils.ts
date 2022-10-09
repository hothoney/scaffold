export const parseToken = (token: string | null) => {
  if (!token) {
    return false;
  }
  try {
    const [, payload] = token.split('.');
    return JSON.parse(window.atob(payload));
  } catch (error) {
    console.warn('parse token failed');
    return false;
  }
};
