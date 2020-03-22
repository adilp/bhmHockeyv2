import React, { Components } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';

const Routes = () => (
    <Router>
                <Stack key="root">
                    <Scene key="login" compntent={Login} title = "Login" />
                    <Scene key="register" component={Signup} title="Register" />
                </Stack>
            </Router>
 )
 export default Routes
