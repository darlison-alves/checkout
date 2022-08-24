export const TOKEN_KEY='@ibb_token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const login = (token: string) => {
  localStorage.clear()
  localStorage.setItem(TOKEN_KEY, token);
}
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.clear()
}