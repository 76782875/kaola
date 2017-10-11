
import React from 'react';
import { Router, Switch, Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';

function RouterConfig({ history, app }) {

    // 登录
    const Login = dynamic({
        app,
        component: () => import('./routes/Login'),
    });


    const routes = [
        {
            path: "/wb",
            models: () => [import('./models/index')],
            component: () => import('./routes/Index/Wb'),
        },
        // {
        //     path: "/mp",
        //     models: () => [import('./models/index')],
        //     component: () => import('./routes/Index/Mp'),
        // },
        {
            path: "/myOrder",
            models: () => [import('./models/myOrder')],
            component: () => import('./routes/MyOrder'),
        },
        {
            path: "/orderDetail/:id",
            models: () => [import('./models/orderDetail')],
            component: () => import('./routes/OrderDetail'),
        },
        {
            path: "/myOrder",
            models: () => [import('./models/myOrder')],
            component: () => import('./routes/MyOrder'),
        },
        {
            path: "/cart",
            models: () => [import('./models/cart')],
            component: () => import('./routes/Cart/index')
        },
    ];

    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <App>
                    <Switch>
                        <Route path="/" render={() => {
                            return window.localStorage.getItem("token") ?
                                <Redirect to="/wb" /> :  <Redirect to="/login" />}} />
                        {
                            routes.map(({path, ...dynamics}, key) => (
                                <Route
                                    exact
                                    path={path}
                                    key={key}
                                    component={dynamic({
                                        app,
                                        ...dynamics
                                    })}
                                />
                            ))
                        }
                    </Switch>
                </App>
            </Switch>
        </Router>
    );
}

export default RouterConfig;

