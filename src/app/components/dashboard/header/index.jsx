"use client"
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link"
import { useRouter  } from 'next/navigation'
import { logoutUser  } from '../../../../redux/reducers/authSlice';
import { getBaseUrl } from '@/utils/constants';

const Header = () => {
      const router = useRouter()
      const dispatch = useDispatch()
      const handleLogout = async () => {
        dispatch(logoutUser())
        localStorage.clear()
        sessionStorage.clear()
        window.location = '/login'
      }
    return (
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <Link className="navbar-brand brand-logo" href="/dashboard"><img src={`${getBaseUrl()}assets/images/logo.svg`} alt="logo" /></Link>
          <Link className="navbar-brand brand-logo-mini" href="dashboard"><img src={`${getBaseUrl()}assets/images/logo.svg`} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-menu" />
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-settings d-none d-lg-block">
              <Link className="nav-link" href="#"  onClick={handleLogout}>
                Logout
                <i className="mdi mdi-power" />
              </Link>
            </li>
          </ul> 
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu" />
          </button>
        </div>
      </nav>
    )
}

export default Header