import { Route, Routes } from 'react-router-dom';

import { UserMsg } from './cmps/user-msg';
import { NavBar } from './cmps/nav-bar';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import routes from './routes';
import './styles/main.scss';
function RootCmp() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-app">
        <UserMsg />
        <Routes>
          {routes.map(route => {
            return (route.children) ?
              <Route key={route.path} path={route.path} element={route.component} >
                {route.children.map(child =>
                  <Route key={child.path} path={route.path + child.path} element={child.component} />)}
              </Route> :
              <Route key={route.path} path={route.path} element={route.component} />
          }
          )}
        </Routes>
      </div>
    </DndProvider>
  );
}

export default RootCmp;
