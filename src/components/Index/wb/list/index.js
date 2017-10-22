import React from 'react'
import styles from './index.less'
import { Table ,Checkbox ,Row} from 'antd'
import {connect} from 'dva'

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postionSelects:[]
        }
    }
    doubleFunction = (idx) => {
        this.props.dispatch({
            type:'index/editActive',
            payload:{
                _active_right:false,
            }
        });
    };
    singleFunction = (idx) => {
        this.props.dispatch({
            type:'index/editActive',
            payload:{
                _active_right:true,
            }
        });
    };
    onChange = (item,selected,event ) =>{
        const {postionSelects} = this.state,{id,uid} = item;
        const isFirst =  postionSelects[id];
        postionSelects[id] = [selected[selected.length -1]];
        //[selected[selected.length -1]]始终获取的是当前点击的value
        console.log(isFirst,selected,[selected[selected.length -1]],99999999999);
        const priceType  = postionSelects[id][0];
        // if (isFirst && isFirst[0]  && priceType) {
        //     this.props.modifyCart({uid, priceType})
        // } else {
        //     if (!priceType) {
        //         const cartId = record.cart.id;
        //         this.props.deleteCart(cartId);
        //     } else {
        //         this.props.addCart({uid, priceType}).then((res) => {
                    this.setState({
                        postionSelects
                    })
        //         })
        //     }
        // }
        this.doubleFunction();//点击checkbox时，不让页面开始动画
        console.warn(item);
        console.warn(selected);
        console.warn(postionSelects,id,uid);
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
                    return(
                        <div>
                            <Checkbox.Group onChange={this.onChange.bind(this,item)}>
                                {/* {item.priceHardDirect?<Checkbox style={{display:'block',color: '#fff'}}>硬广直发</Checkbox>:null} */}
                                {item.priceHardDirect?<Row><Checkbox style={{color: '#fff'}} value="0">硬广直发</Checkbox></Row>:null}
                                {item.priceHardIndirect?<Row><Checkbox style={{color: '#fff'}} value="1">硬广转发</Checkbox></Row>:null}
                                {item.priceSoftDirect?<Row><Checkbox style={{color: '#fff'}} value="2">软广直发</Checkbox></Row>:null}
                                {item.priceSoftIndirect?<Row><Checkbox style={{color: '#fff'}} value="3">软广转发</Checkbox></Row>:null}
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
                    onRowDoubleClick = {this.doubleFunction.bind(this)}
                    onRowClick = {this.singleFunction.bind(this)}
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
export default connect(mpStateToProps)(List);