import React from 'react'
import styles from './index.less'
import { Table ,Checkbox ,Row} from 'antd'
import {connect} from 'dva'

class List extends React.Component{
    state = {
        postionSelects:[]
    }
    firstComing = false
    componentDidUpdate() {
        console.log(this._handleWbMedias);
        this._handleWbMedias();
    }

    _handleWbMedias() {
        const wbMedias = this.props.wbList.list.list,
            postionSelects = this.state.postionSelects,
            firstComing = this.firstComing;
        if (firstComing || wbMedias.length < 1) return;
        wbMedias.forEach(medias => {
            postionSelects[medias.id] = [medias.cart.priceType];
            console.log(postionSelects);
        })
        this.firstComing = true;
    }
    onChange = (item,selected) =>{
        const {postionSelects} = this.state,
        {id, uid} = item;
        const isFirst = postionSelects[id];
        postionSelects[id] = [selected[selected.length - 1]];
        const priceType = postionSelects[id][0];
         
                this.props.addSelect({uid, priceType}).then((res) => {
                    this.setState({
                        postionSelects
                    })
                })
        //     }
        // }
        //准备参数，调用接口
        this.props.doubleFunction();//点击checkbox时，不让页面开始动画
    }
    render(){
        console.log(this.state.postionSelects);
        const {
            props:{
                wbList:{
                    list:{list}
                },
                _active_right
            }
        } = this;
        const checkbox = {
            display: 'block !important',
        };
        const {postionSelects} = this.state;
        const column = [
            {
                title:'头像',
                dataIndex:'avatar',
                width:'',
                render:(avatar,item) => {
                    return (
                        <div>
                            <span className={styles.imgs}>
                                <img src={item.avatar} />
                            </span>
                        </div>
                    )
                }
            },{
                title:'自媒体账号',
                dataIndex:'id2',
                width:'',
            },{
                title:'粉丝数(万)',
                dataIndex:'id3',
                width:'',
            },{
                title:'位置-报价',
                dataIndex:'id4',
                width:'',
                render: (text,item) => {
                    const {id} =item;
                    const {postionSelects} =this.state;
                    return(
                        <div > 
                            {/* <Checkbox.Group onChange={this.onChange.bind(this,item)} value={this.state.postionSelects[id]} defaultValue={item.cart?'"'+ item.cart.priceType +'"':'"'+ 0 +'"'}> */}
                            <Checkbox.Group onChange={this.onChange.bind(this,item)} value={postionSelects[id]}>
                                {/* {item.priceHardDirect?<Checkbox style={{display:'block',color: '#fff'}}>硬广直发</Checkbox>:null} */}
                                {item.priceHardDirect?<Row><Checkbox style={{color: '#fff'}} value={1}>硬广直发</Checkbox></Row>:null}
                                {item.priceHardIndirect?<Row><Checkbox style={{color: '#fff'}} value={2}>硬广转发</Checkbox></Row>:null}
                                {item.priceSoftDirect?<Row><Checkbox style={{color: '#fff'}} value={3}>软广直发</Checkbox></Row>:null}
                                {item.priceSoftIndirect?<Row><Checkbox style={{color: '#fff'}} value={4}>软广转发</Checkbox></Row>:null}
                            </Checkbox.Group>
                        </div>
                    );
                }
            },{
                title:'推荐等级',
                dataIndex:'id5',
                width:'',
            },{
                title:'平均转发数',
                dataIndex:'id6',
                width:'',
            },{
                title:'平均评论数',
                dataIndex:'id7',
                width:'',
            },{
                title:'平均点赞数',
                dataIndex:'id8',
                width:'',
            },{
                title:'转赞比',
                dataIndex:'id9',
                width:'',
            },
        ]
        return(
            <div className={this.props._active_right?styles._active_right:styles.list_main}>
                <Table
                    columns = {column}
                    dataSource = {list}
                    rowKey = 'id'
                    onRowDoubleClick = {this.props.doubleFunction.bind(this)}
                    onRowClick = {this.props.singleFunction.bind(this)}
                    //onRowClick = {this.asideOrEchartsFunction.bind(this,'single')}
                >

                </Table>
            </div>
        )
    }
}
function mpStateToProps(state){
    const {
        wbList,
        _active_right,
    } = state.index;
    // console.warn(state,123333);
    return{
        wbList,
        _active_right,
    }
}
function mpDispatchToProps(dispatch){
    return{
        dispatch,
        doubleFunction:(idx) => {
            dispatch({
                type:'index/editActive',
                payload:{
                    _active_right:false,
                }
            });
        },
        singleFunction:(idx) => {
            dispatch({
                type:'index/editActive',
                payload:{
                    _active_right:true,
                }
            });
        },
        addSelect: ({uid, priceType}) => {
            return dispatch({
                type: "app/addWbCart",
                payload: {uid, priceType}
            });
        },
        wbSelect: ({uid, priceType}) => {
            return dispatch({
                type: "app/modifyWbCart",//不知道接口，先模拟调一下
                payload: {uid, priceType}
            });
        },
        deleteSelect: (id) => {
            dispatch({
                type: "app/deleteWbCart",
                payload: id
            });
        },
    }
}
export default connect(mpStateToProps,mpDispatchToProps)(List);