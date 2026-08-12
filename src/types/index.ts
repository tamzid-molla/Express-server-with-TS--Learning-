export type ROLES = 'user' | 'moderator' | 'admin';

export const USER_ROLE = {
    admin: 'admin',
    moderator: 'moderator',
    user: 'user'
} as const;

