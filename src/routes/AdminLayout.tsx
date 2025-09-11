import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth';

export default function AdminLayout() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}
