// src/components/AdminSidebar.tsx
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-card border-r h-screen fixed">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="space-y-2 p-4">
        <Link to="/admin/inquiries" className="block px-4 py-2 text-sm hover:bg-muted rounded">
          Upiti
        </Link>
        <Link to="/admin/materials" className="block px-4 py-2 text-sm hover:bg-muted rounded">
          Materijali
        </Link>
        <Link to="/admin/works" className="block px-4 py-2 text-sm hover:bg-muted rounded">
          Galerija radova
        </Link>
        <Link to="/admin/reviews" className="block px-4 py-2 text-sm hover:bg-muted rounded">
          Recenzije
        </Link>
        <Link to="/admin/faq" className="block px-4 py-2 text-sm hover:bg-muted rounded">
          FAQ
        </Link>
        <Link to="/admin/pricing" className="block px-4 py-2 text-sm hover:bg-muted rounded">
          Cene
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;