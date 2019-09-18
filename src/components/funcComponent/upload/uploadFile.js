import React from 'react';
import Dropzone from "react-dropzone";
import ImagesList from "./ImagesList"
var cloneDeep = require('lodash.clonedeep');

const axios = require('axios');

export default class UploadFile extends React.Component {
    constructor() {
        super()
        this.state = {
            Images: []
        }
        this.onDrop = this
            .onDrop
            .bind(this)
    }

    steSt(image) {
        this.setState({Images: image})
    }

    onDrop(acceptedFiles, rejectedFiles) {

        if (acceptedFiles.length !== 0) {
            var bodyFormData = new FormData();
            bodyFormData.append('file', acceptedFiles[0]);
            this.upLoad(bodyFormData)

            console.log("end")
        }
    }

    upLoad = async(bodyFormData) => {
        const res = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8088/v1/uploadFile',
            data: bodyFormData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
        var Images = cloneDeep(this.state.Images)
        Images.push({url: res.data.ResultMessage.Filename, filename: res.data.ResultMessage.Filename, filesize: res.data.ResultMessage.Size})
        setTimeout(() => this.steSt(Images), 200)
        console.log(res)
    }
    render() {
        const styled = require('styled-components').default;

        const getColor = (props) => {
            if (props.isDragReject) {
                return '#c66';
            }
            if (props.isDragActive) {
                return '#6c6';
            }
            return '#666';
        };

        const Container = styled.div `
      width: 98%;
      height: 88%;
      border-width: 2px;
      border-radius: 5px;
      border-color: ${props => getColor(props)};
      border-style: ${props => props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
      background-color: ${props => props.isDragReject || props.isDragActive ? '#fff' : ''};
      `;

        return (
            <Dropzone accept="image/*" onDrop={this.onDrop}>
                {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                    acceptedFiles
                }) => {
                    return (
                        <div>
                            <Container
                                isDragActive={isDragActive}
                                isDragReject={isDragReject}
                                {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <div
                                    style={{
                                    width: "1000px",
                                    textAlign: "center",
                                    margin: "2em"
                                }}>請用拖曳或點選的方式上傳圖片</div>

                            </Container>
                            {this
                                    .state
                                    .Images
                                    .map((item, index) => (<ImagesList
                                        key={"ImagesList" + index}
                                        filename={item.filename}
                                        filesize={item.filesize}/>))
                                }
                        </div>
                    )
                }}
            </Dropzone>

        );
    }
}
