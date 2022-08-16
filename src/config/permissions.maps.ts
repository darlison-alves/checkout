export enum ROLES {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
  USER_SUBSCRIPTION = 'ROLE_USER_SUBSCRIPTION',
  PREUSER = 'ROLE_PREUSER',
  ENTERPRISE = 'ROLE_ENTERPRISE'
}

export enum SCOPES {
  canCreate,
  canEdit,
  canDelete,
  canView
}

export const PERMISSIONS = {
  [ROLES.PREUSER]: [SCOPES.canView],
  [ROLES.USER]: [SCOPES.canView],
  [ROLES.ENTERPRISE]: [SCOPES.canCreate, SCOPES.canEdit, SCOPES.canView, SCOPES.canDelete],
  [ROLES.ADMIN]: [SCOPES.canCreate, SCOPES.canEdit, SCOPES.canView, SCOPES.canDelete],
  [ROLES.USER_SUBSCRIPTION]: [SCOPES.canCreate, SCOPES.canEdit, SCOPES.canView]
}