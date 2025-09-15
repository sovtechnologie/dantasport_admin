import { useSelector } from 'react-redux';

export function getUserRole() {
  const role = useSelector((state) => state.auth.user?.role);
  if (role === 2) return "admin";
  if (role === 1) return "vendor";
  return null;
}
