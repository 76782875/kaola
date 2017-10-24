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
        this._handleWbMedias();
    }

    _handleWbMedias() {
        const wbMedias = this.props.wbList.list.list,
            postionSelects = this.state.postionSelects,
            firstComing = this.firstComing;
        if (firstComing || wbMedias.length < 1) return;
        wbMedias.forEach(medias => {
            if(medias.cart){
                postionSelects[medias.id] = [medias.cart.priceType];
            }
        })
        this.firstComing = true;
        this.setState({
            postionSelects
        });
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
                dataIndex:'mediaName',
                width:'',
                render:(text,item) =>{
                    return(
                        <span>{item.mediaName}</span>
                    )
                }
            },{
                title:'粉丝数(万)',
                dataIndex:'fans',
                width:'',
                render:(text,item) =>{
                    return(
                        <span>{item.fans}</span>
                    )
                }
            },{
                title:'位置-报价',
                dataIndex:'id4',
                width:'',
                render: (text,item) => {
                    const {id} =item;
                    const {postionSelects} =this.state;
                    return(
                        <div onClick={(e) => {
                            e.stopPropagation();
                        }}> 
                            {/* <Checkbox.Group onChange={this.onChange.bind(this,item)} value={this.state.postionSelects[id]} defaultValue={item.cart?'"'+ item.cart.priceType +'"':'"'+ 0 +'"'}> */}
                            <Checkbox.Group onChange={this.onChange.bind(this,item)} value={postionSelects[id]}>
                                {/* {item.priceHardDirect?<Checkbox style={{display:'block',color: '#fff'}}>硬广直发</Checkbox>:null} */}
                                {item.priceHardDirect?<Row><Checkbox style={{color: '#fff'}} value={1}>硬广直发</Checkbox><span className={styles.price}>￥{item.priceHardDirect}</span></Row>:null}
                                {item.priceHardIndirect?<Row><Checkbox style={{color: '#fff'}} value={2}>硬广转发</Checkbox><span className={styles.price}>￥{item.priceHardIndirect}</span></Row>:null}
                                {item.priceSoftDirect?<Row><Checkbox style={{color: '#fff'}} value={3}>软广直发</Checkbox><span className={styles.price}>￥{item.priceSoftDirect}</span></Row>:null}
                                {item.priceSoftIndirect?<Row><Checkbox style={{color: '#fff'}} value={4}>软广转发</Checkbox><span className={styles.price}>￥{item.priceSoftIndirect}</span></Row>:null}
                            </Checkbox.Group>
                        </div>
                    );
                }
            },{
                title:'推荐等级',
                dataIndex:'recommendLevel',
                width:'',
                render:(text,item) =>{
                    return(
                        <span>{item.recommendLevel}</span>
                    )
                }
            },{
                title:'平均转发数',
                dataIndex:'medianRepostsCnt',
                width:'',
                render:(text,item) =>{
                    return(
                        <span>{item.medianRepostsCnt}</span>
                    )
                }
            },{
                title:'平均评论数',
                dataIndex:'medianCommentsCnt',
                width:'',
                render:(text,item) =>{
                    return(
                        <span>{item.medianCommentsCnt}</span>
                    )
                }
            },{
                title:'平均点赞数',
                dataIndex:'medianAttitudesCnt',
                width:'',
                render:(text,item) =>{
                    return(
                        <span>{item.medianAttitudesCnt}</span>
                    )
                }
            },{
                title:'转赞比',
                dataIndex:'id9',
                width:'',
                render:(text,item) =>{
                    return(
                        <span>{item.medianRepostsCnt/item.medianCommentsCnt}</span>
                    )
                }
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
    console.log(state,33333333333);
    const {
        wbList,
        _active_right,
        wb_item,
        wbBaseMapData,
    } = state.index;
    // console.warn(state,123333);
    return{
        wbList,
        _active_right,
        wb_item,
        wbBaseMapData,
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
                    wb_item:idx,
                }
            });
        },
        singleFunction:(idx) => {
            dispatch({
                type:'index/editActive',
                payload:{
                    _active_right:true,
                    wb_item:idx,
                }
            });
            //调用近30天基本指标变化图
            dispatch({
                type:'index/baseMap',
                payload:idx.uid,
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