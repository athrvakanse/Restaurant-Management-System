import React from 'react';
import { Link } from 'react-router-dom';

function WaiterSidebar() {
  return (
    <div className="bg-light border-end p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="text-dark fw-bold text-center mb-4">Waiter Panel</h5>

      {/* Orders Link */}
      <div className="mb-2">
        <Link to="/viewdetails" className="btn btn-outline-dark w-100 text-start">
          Orders
        </Link>
      </div>

      {/* Track Orders Link */}
      <div className="mb-2">
        <Link to="/trackdetails" className="btn btn-outline-dark w-100 text-start">
          Track Orders
        </Link>
      </div>

      {/* Generate Bills Link */}
      <div className="mb-2">
        <Link to="/generatebills" className="btn btn-outline-dark w-100 text-start">
          Generate Bills
        </Link>
      </div>
    </div>
  );
}

export default WaiterSidebar;