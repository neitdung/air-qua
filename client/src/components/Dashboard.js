import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Map from './map';

export default () => (
    <div>
        <Card>
            <CardHeader title="Bản đồ hệ thống giám sát chất lượng không khí" />
        </Card>
        {/* <iframe src="https://aqicn.org/map/hanoi/" height="500" width="1100"/> */}
        <Map/>        
    </div>
);
