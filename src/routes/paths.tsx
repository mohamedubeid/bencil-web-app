const ROOTS = {
  AUTH: '/auth',
};

export const paths = {
  root: '/',  //home page
  auth: {
      login: `${ROOTS.AUTH}/login`,
      verify: `${ROOTS.AUTH}/verify`,
      register: `${ROOTS.AUTH}/register`,
      newPassword: `${ROOTS.AUTH}/new-password`,
      forgotPassword: `${ROOTS.AUTH}/forgot-password`,
  },
};
