import React from 'react'
import styles from './index.less'
import { connect } from 'dva'
import { Input } from 'antd'

const Search = Input.Search;
class Aside extends React.Component{
    render(){
        return(
            <div className={ this.props._active_right?styles._active_right:styles.aside_main}>
                <ol>
                    <li>
                        <h4>账号搜索</h4>
                        <div className={styles.search}>
                            <Search
                                placeholder="input search text"
                                style={{ width: 260 }}
                                onSearch={value => console.log(value)}
                            />
                        </div>
                    </li>
                    <li>
                        <h4>投放需求</h4>
                        <div></div>
                    </li>
                    <li>
                        <h4>账号分类</h4>
                        <div></div>
                    </li>
                    <li>
                        <h4>账号评估</h4>
                        <div></div>
                    </li>
                </ol>
            </div>
        )
    }
}
function mpStateToProps(state){
    const {
        index:{
            _active_right
        }
    } = state
    return {_active_right}
}
function mpDispatchToProps(dispatch){
    // dispatch({
    //     type:"index/asideSearch",
    //     payload:{
    //         keywords:
    //     }
    // });
}
export default connect(mpStateToProps,mpDispatchToProps)(Aside);