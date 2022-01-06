/* eslint-disable func-names */
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import MyContent from './MyContent/MyContent';

const Profile = function () {
  const { path, url } = useRouteMatch();

  return (
    <div className="card">
      <div className="card-header">
        <h2>My profile</h2>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" exact to={`${url}`}>
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/examples`}>
              Messages
            </NavLink>
          </li>
        </ul>

        <div className="pt-4">
          <Switch>
            <Route path={`${path}/examples`} component={MyContent} />
            <Route path={`${path}`} component={ProfileDetails} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Profile;
