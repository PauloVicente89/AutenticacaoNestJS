export const RoleTypes = {
  0: 'USER_ADMIN',
  1: 'USER_APP',
  2: 'USER_COMPANY',
};

export const MenuScreenAvailable = {
  USER_APP: [
    'client',
  ],
  USER_ADMIN: [
    'dashboard',
    'client',
    'company',
  ],
  USER_COMPANY: ['dashboard', 'company'],
};
