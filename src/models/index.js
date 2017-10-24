import * as indexService from '../services/index.js'


export default{
    namespace:'index',
    state:{
        wbList:{
            list:[],
        },
        wb_item:{},
        wbBaseMapData:[],
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
        editActive(state,{payload:values}){
            return {
                ...state,
                _active_right:values._active_right,
                wb_item:values.wb_item,
            }
        },
        baseMapData(state,{payload:values}){
            const wbBaseMapData = values.result;
            return {
                ...state,
                wbBaseMapData,
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
        *baseMap ({payload:values},{call,put}){
            const result = yield call(indexService.getBadeMap,{uid:values});
            yield put({
                type:'baseMapData',
                payload:{
                    result,
                }
            });
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