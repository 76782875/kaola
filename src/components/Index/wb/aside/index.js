import React from 'react'
import styles from './index.less'

class Aside extends React.Component{
    render(){
        return(
            <div className={styles.aside_main}>
                <ol>
                    <li>
                        <h4>账号搜索</h4>
                        <div></div>
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
export default Aside;