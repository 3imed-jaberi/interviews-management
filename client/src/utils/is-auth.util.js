import decode from 'jwt-decode'

const isAuthenticated = () => {
  const token = localStorage.getItem('x-token')

  try {
    const { exp, ...userData } = decode(token);
    localStorage.setItem("user-payload", userData)
    if (Date.now() / 1000 > exp) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

export { isAuthenticated };
