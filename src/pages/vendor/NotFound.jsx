import { Link } from 'react-router-dom';

const VendorNotFound = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-4xl font-bold text-blue-600">Page Not Found</h2>
    <p className="mt-2 text-gray-600">Looks like the page doesn't exist.</p>
    <Link to="/vendor" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
      Back to Vendor Dashboard
    </Link>
  </div>
);

export default VendorNotFound;
