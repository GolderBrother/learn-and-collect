import React from 'react';
import {Input,Row,Col,Card} from 'antd';

export default class House extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item:'',  //预计租金
            time:'',  //预计年数
            rent:'',  //租房合计
            buy:'',   //买房合计
            balance:'',  //买房 - 租房
            des:'………………',  //砖家建议
        }
    }
    //预计租金
    handleChange = (e) => {
        const money = e.target.value;
        this.setState({item:money},()=>this.handleRent());     
    }
    //预计年数
    handleTime = (e) => {
       const time = e.target.value;
        this.setState({time:time},()=>this.handleRent());
    }
    //公共方法
    handleChange2 = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]:value},()=>this.handleRent());     
    }
    //租房合计
    handleRent = () =>{
        const rent = this.state.time*12*this.state.item/10000;
        this.setState({rent:rent})
    }
    
    //买房合计
    handleBuy = (e) => {
        const buyMoney = e.target.value;
        this.setState({ buy: buyMoney });
        const balance = buyMoney-this.state.rent;
        this.setState({ balance: balance });
        if(balance > 0) {
            this.setState({ des: '租房更合算！' });
        } else if(balance === 0) {
            this.setState({ des: '哥们儿，洗洗睡吧！' });
        } else {
            this.setState({ des: '买房更合算！' });
        }
    }

    render() {
        return (
            <div style={{marginTop:80}}>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input type="number" addonBefore="预计租金：" name="item" addonAfter="元/月" value={this.state.item}
                         onChange={(event) => this.handleChange2(event)}/>
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input type="number" addonBefore="预计年数：" addonAfter="年" name="time" onChange={this.handleChange2}/>
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="租房合计：" addonAfter="万" value={this.state.rent} disabled id="red" />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input type="number" addonBefore="买房合计：" addonAfter="万" onChange={this.handleBuy} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Input addonBefore="买房 - 租房：" addonAfter="万" value={this.state.balance} disabled id="blue" />
                    </Col>
                </Row>
                <Row type="flex" justify="center" className="rowItem">
                    <Col span={10}>
                        <Card bodyStyle={{ padding:10,fontSize:20}}>
                            <p>砖家建议：{this.state.des}</p>
                        </Card>
                    </Col>
                </Row>
                
            </div>
        );
    }
}

