import * as indexService from '../services/index.js'


export default{
    namespace:'index',
    state:{
        wbList:{
            list:[],
        },
        _active_right:false,
    },
    reducers:{
        wbListData(state,{payload:list}){
            return {...state,
                wbList:{
                    list,
                }
            }
        },
        editActive(state,{payload:boolean}){
            return {
                ...state,
                _active_right:boolean._active_right
            }
        }
    },
    effects:{
        *wbList ( _, {call,put}){
            const result = yield call(indexService.wbList, _.values);
            const {list} = result;
            yield put({
                type:'wbListData',
                payload:{
                    list
                }
            });
        },
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