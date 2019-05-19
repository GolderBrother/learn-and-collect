import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

class Album extends Component {
  render() {
        const imgs = [
            [
                'http://img.hb.aicdn.com/1cad414972c5db2b8c1942289e3aeef37175006a8bb16-CBtjtX_fw',
                'http://img.hb.aicdn.com/016f2e13934397e17c3482a4529f3da1149d37fd2a99c-RVM1Gi_fw',
                'http://img.hb.aicdn.com/8c5d5f2bf6427d1b5ed8657a7ae0c9938d3465e367899-AJ0zVA_fw',
                'http://img.hb.aicdn.com/bd71ccac0b16bbcade255a1a8a63504d71c7dee9a8652-zBCN9d_fw',
                'http://img.hb.aicdn.com/37a40cb04345463858d45418ae6ed9ef319e30dc37a45-o4pQ0j_fw',
            ],
            [
                'http://img.hb.aicdn.com/5fad6c3a14a9b80c4448835bb6b23ab895d18e234eff3-BPGmox_fw',
                'http://img.hb.aicdn.com/a1a19de5dac212a646ba6967ef565786399fb1665bd04-EEvwzR_fw',
                'http://img.hb.aicdn.com/06595f8044e881de3a82d691768bc8c21a2a9f3633d60-XKjC2s_fw',
                'http://img.hb.aicdn.com/880787b36d45efbe05aa409c867db29a3028e02da7f9b-qxGib9_fw',
                'http://img.hb.aicdn.com/4964b97f6f6eb61a20922b40842adf0169c44e491c4b60-azX1S7_fw'
            ],
            [
                'http://img.hb.aicdn.com/ff97d00944edfc706c62dd5c0e955c4099a37b407534f-BcUqf0_fw',
                'http://img.hb.aicdn.com/0e22be22b08c6f78b94283b6cfa890093ac3cae8401e7-b1ftfi_fw',
                'http://img.hb.aicdn.com/879f870e15f7cc0847c8ae19a5fcbe974d5904bb181d7-RGmtNU_fw',
                'http://img.hb.aicdn.com/b4a8e62958555a97dc3de9ccb03284bf556c042925522-x50qGv_fw',
                'http://img.hb.aicdn.com/1ef493a15674e9fd523b248ea4ec43d2ea9ce6952ff3e-WavWKc_fw'
            ],
            [
                'http://img.hb.aicdn.com/8e16efec78ac4a3684fc8999d18e3661af40fd4510a25-DDvQON_fw',
                'http://img.hb.aicdn.com/61dfa024c8040e6a5bcb03d42928fbcb0c87c1a54e731-yc4lvV_fw',
                'http://img.hb.aicdn.com/6783b4d7811ad7fb87b1446c5488b91179f7608118289-hpEyP3_fw',
                'http://img.hb.aicdn.com/98c786f4314736f95a42bf927bf65a82d305a532c6258-njI6id_fw',
                'http://img.hb.aicdn.com/bd3ba3f907fe098b911947e0020615b50fc340ed2df72-WsuHuM_fw'
            ],
            [
                'http://img.hb.aicdn.com/71471aaac95eade66400a390863b37c76d9addcd14982-0H6sak_fw',
                'http://img.hb.aicdn.com/cb16c68c4d3b7a08b5e91cd351f6b723634ca3fc27d4d-m1JD8z_fw',
                'http://img.hb.aicdn.com/e3559b6e8d7237857382050e5659a64cc0b7d696a2869-stcRXA_fw',
                'http://img.hb.aicdn.com/4ea229436fcf2077502953907a6afb16d3c5cd611b8e2-0dVIeH_fw',
                'http://img.hb.aicdn.com/7be61ba6bdb20a73be63edc387b16eec72d0bbb51c7ef-XafA07_fw',
            ]
        ];
        const imgsTag = imgs.map(v1 => (
            v1.map(v2 => (
                <div className="cloud-box">
                    <Card bordered={true} bodyStyle={{ padding: 0 }}>
                        <div>
                            <img alt="example" width="100%" src={v2} />
                        </div>
                        <div className="pa-m">
                            <h3>React Admin</h3>
                            <small><a target="_blank">https://123.com</a></small>
                        </div>
                    </Card>
                </div>
            ))
        ));
        return (
            <div>
                <Row gutter={10}>
                    <Col span={5}>
                        {imgsTag[0]}
                    </Col>
                    <Col span={5}>
                        {imgsTag[1]}
                    </Col>
                    <Col span={5}> 
                        {imgsTag[2]}
                    </Col>
                    <Col span={5}>
                        {imgsTag[3]}
                    </Col>
                    <Col span={4}>
                        {imgsTag[4]}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Album;