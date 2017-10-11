
import dva from 'dva';
import "babel-polyfill";
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.less';

// import './themes/default.less';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
    ...createLoading({
        effects: true,
    }),
    history: createHistory(),
    onError(e) {
        message.error(e.message, ERROR_MSG_DURATION);
    },
});

// 2. Plugins

// 3. Model
// Moved to router.js
app.model(require('./models/app'));
app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

