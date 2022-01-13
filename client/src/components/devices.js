import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const DeviceList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="location" />
        </Datagrid>
    </List>
);
