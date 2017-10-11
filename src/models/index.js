import * as indexService from '../services/index.js'


export default{
    namespace:'index',
    state:{
        wbList:{
            list:[],
        }
    },
    reducers:{

    },
    effects:{
        *wbList ( _, {call,put}){
            const result = yield call(indexService.wbList, _.values);
            const {list} = result;
            console.warn(result);
            yield put({state,});
        }
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query}) => {
                if(pathname == '/wb'){
                    dispatch({
                        type:'wbList',
                        values:{pageSize:'10',page:'1'}
                    });
                }
            })
        }
    }
}