import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PPM from './components/chart';
import Analys from './components/analys';
import { UserList } from './components/users'
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import authProvider from './components/authProvider';
import Dashboard from './components/Dashboard';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="Chart" options={{ label: 'Đồ thị' }} list={PPM} icon={PostIcon}/>
    <Resource name="Analys" options={{ label: 'Thống kê' }} list={Analys} icon={PostIcon}/>
    <Resource name="users" options={{ label: 'Quản lý thiết bị' }} list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;
