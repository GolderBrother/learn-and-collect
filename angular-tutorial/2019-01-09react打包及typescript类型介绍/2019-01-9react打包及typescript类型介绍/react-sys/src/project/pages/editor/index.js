import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';    //转换为HTML 
import draftToMarkdown from 'draftjs-to-markdown';  //标记语言
import './index.scss'
//https://www.npmjs.com/package/react-draft-wysiwyg
//https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

export default class wysiwyg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: '',
            editorContent:undefined  //编辑的内容
        };
    }
    //编辑状态改变(针对编辑器)
    onEditorStateChange= (editorState) => {
        console.log('aa')//先触发aa
        this.setState({
        editorState:editorState
        });
    };
    //内容改变（获取内容）
    onEditorChange = (editorContent) => {
        console.log('bb')//再触发bb
        this.setState({
            editorContent:editorContent
        });
    };

    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );

    render() {
        const { editorContent, editorState } = this.state;
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <div className="cloud-box">
                            <Card title="富文本编辑器" bordered={true} >
                                <Editor
                                    editorState={editorState}
                                   // toolbarClassName="home-toolbar"
                                    //wrapperClassName="home-wrapper"
                                    editorClassName="home-editor123"
                                    //编辑状态改变
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        history: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        fontFamily: { options: ['宋体', '黑体', '楷体', '微软雅黑','Arial']}
                                       // image: { uploadCallback: this.imageUploadCallBack },
                                    }}
                                    //内容改变
                                    onContentStateChange={this.onEditorChange}
                                    placeholder="请输入文字"
                                    onFocus={() => {console.log('focus')}}
                                    onBlur={() => {console.log('blur')}}
                                    //onTab={() => {console.log('tab'); return true;}}
                                    //localization={{ locale: 'zh', translations: {'generic.add': 'Add'} }}
                                    
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Card title="同步转换HTML" bordered={true}>
                            <pre>{draftToHtml(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="同步转换MarkDown" bordered={true}>
                            <pre style={{whiteSpace: 'pre-wrap'}}>{draftToMarkdown(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="同步转换JSON" bordered={true}>
                            <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(editorContent)}</pre>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}