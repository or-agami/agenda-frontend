import { Route, Routes } from 'react-router-dom';

import { UserMsg } from './cmps/user-msg';
import { AppHeader } from './cmps/app-header';

import routes from './routes';
import './styles/main.scss';
function RootCmp() {
  return (
    <div className="main-app">
      <UserMsg />
      <AppHeader />
      <main className='container'>
        <Routes>
          {routes.map(route => {
            return (route.children) ?
              <Route key={route.path} path={route.path} element={route.component} >
                {route.children.map(child =>
                  <Route key={child.path} path={child.path} element={child.component} />)}
              </Route> :
              <Route key={route.path} path={route.path} element={route.component} />
          }
          )}
        </Routes>
      </main>
    </div>
  );
}

export default RootCmp;
