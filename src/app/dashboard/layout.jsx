
/* eslint-disable react/no-unescaped-entities */

import Header from '../components/dashboard/header';
import SideBar from '../components/dashboard/sidebar';
import Footer from '../components/dashboard/footer';
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
    </div><script src="assets/vendors/js/vendor.bundle.base.js" /><script src="assets/vendors/chart.js/chart.umd.js"></script><script src="assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js" /><script src="assets/js/off-canvas.js" /><script src="assets/js/misc.js" /><script src="assets/js/settings.js" /><script src="assets/js/todolist.js" /><script src="assets/js/jquery.cookie.js" /><script src="assets/js/dashboard.js" /></>
  )

}
