export const parseToken = (token: string | null) => {
  if (!token) {
    return false;
  }
  try {
    token = token.replaceAll('-', '+').replaceAll('_', '/');
    const [, payload] = token.split('.');
    // debugger;
    return JSON.parse(
      decodeURIComponent(
        window
          .atob(payload)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      )
    );
  } catch (error) {
    console.warn('parse token failed');
    return false;
  }
};
