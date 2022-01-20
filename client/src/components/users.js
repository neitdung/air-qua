import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';
import Switch from '@mui/material/Switch';

export const UserList = props => (
    <List {...props} title="List of devices">
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="address.geo.lat" />
            <TextField source="address.geo.lng" />
            <Switch defaultChecked color="secondary" />
        </Datagrid>
    </List>
);
