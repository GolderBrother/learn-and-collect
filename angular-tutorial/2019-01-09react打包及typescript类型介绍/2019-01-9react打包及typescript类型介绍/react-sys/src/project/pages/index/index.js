import React, { Component } from 'react';
import { Row, Col ,Card ,Icon } from 'antd';
import EchartsList from './echartsList';
import {connect} from 'react-redux';

@connect((state)=>({
        aaa:state.aaa
    })
)
class Index extends Component {
    constructor(){
        super();
        this.state = {
            echartsData:[820, 932, 901, 24],
            echartsData2:[320, 232, 501, 44]
        }
    }
    render() {
        return (
            <div>
                <h1>{this.props.aaa}</h1>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <EchartsList data={this.state.echartsData} type="bar"></EchartsList>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <EchartsList data={this.state.echartsData2} type="line"></EchartsList>
                    </Col>

                </Row>
                <Row gutter={10} type="flex" justify="space-between" align="bottom">
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">收藏</div>
                                        <h2>301</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">云数据</div>
                                        <h2>30122</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">照片</div>
                                        <h2>802</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">邮件</div>
                                        <h2>102</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <div className="cloud-box">
                            <Card className={'no-padding'}>
                            <EchartsList data={this.state.echartsData2} type="line"></EchartsList>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
      }
}

export default Index;
