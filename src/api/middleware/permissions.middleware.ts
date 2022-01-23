import jwtAuthz from "express-jwt-authz";

const Role = ["Officer", "Soldier"];

export const checkPermissions = (permissions: typeof Role) => {
  return jwtAuthz(permissions, {
    customScopeKey: "role",
    // checkAllScopes: true,
    failWithError: true,
  });
};
