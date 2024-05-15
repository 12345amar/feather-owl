"use client";

const Dashboard = () => {
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-home" />
          </span>{" "}
          Dashboard
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span />
              Overview{" "}
              <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
