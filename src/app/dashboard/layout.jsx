/* eslint-disable react/no-unescaped-entities */

import Header from "../components/dashboard/header";
import SideBar from "../components/dashboard/sidebar";
import Footer from "../components/dashboard/footer";
export default async function RootLayout({ children }) {
  return (
    <>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <SideBar />
          <div className="main-panel">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
