export const WORKHUB_ACCESS_KEY = "workhub_access";
export const WORKHUB_ACCESS_VALUE = "true";
export const WORKHUB_PASSWORD = "888";
export const WORKHUB_PASSWORD_ERROR = "Incorrect password";

export function hasWorkhubAccess(): boolean {
  return localStorage.getItem(WORKHUB_ACCESS_KEY) === WORKHUB_ACCESS_VALUE;
}
