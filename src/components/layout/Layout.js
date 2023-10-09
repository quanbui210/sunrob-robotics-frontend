import { Fragment } from 'react';
import MainHeader from './MainHeader';
import { Outlet } from 'react-router';
const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main>
        {props.children}
      </main>
      
    </Fragment>
  );
};

export default Layout;
