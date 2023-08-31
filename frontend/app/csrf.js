// csrf.js
import axios from 'axios';

export const getCsrfToken = async () => {
  try {
    const response = await axios.get(' https://a370-2401-4900-54eb-4fca-11f2-58bc-486d-36a7.ngrok-free.app/getCsrf');
    const csrfToken = response.data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    return null;
  }
};
