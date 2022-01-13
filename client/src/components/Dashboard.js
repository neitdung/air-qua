import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';

export default () => (
    <div>
        <Card>
            <CardHeader title="Hệ thống giám sát chất lượng không khí" />
        </Card>
        <iframe src="https://aqicn.org/map/hanoi/" height="500" width="1100"/>
    </div>
);
