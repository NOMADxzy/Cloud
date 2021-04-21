import {Upload, Button, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import React from 'react';
import axios from "axios";
import SparkMD5 from 'spark-md5'

class MyUpload extends React.Component {
    state = {
        fileList: [],
        UID: ''
    };

    componentWillReceiveProps() {
        this.setState({UID: this.props.UID});
    }

    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.path;
            }
            return file;
        });
        if (info.file.status !== 'uploading') {
            console.log(info.file.url);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }

        this.setState({fileList});
    };

    render() {
        const props = {
            name: 'file',
            headers: {
                authorization: 'authorization-text',
                UID: this.state.UID
            },
            action: 'http://localhost:9000/upload',
            onChange: this.handleChange,
            multiple: true,
            data: (file) => file.uid,
            onPreview: (file) => {
                window.open('http://localhost:9000/' + file.url)
            },
            beforeUpload: this.get_filemd5sum
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button icon={<UploadOutlined/>} type={"primary"}>上传</Button>
            </Upload>
        );
    }

    get_filemd5sum = (ofile, fileList) => {
        return new Promise((resolve, reject) => {
            var continueupload;
            var file = ofile;
            var tmp_md5;
            var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                // file = this.files[0],
                chunkSize = 8097152, // Read in chunks of 2MB
                chunks = Math.ceil(file.size / chunkSize),
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                fileReader = new FileReader();

            fileReader.onload = function (e) {
                spark.append(e.target.result); // Append array buffer
                currentChunk++;
                var md5_progress = Math.floor((currentChunk / chunks) * 100);
                console.log(file.name + "  正在处理，请稍等," + "已完成" + md5_progress + "%");
                if (currentChunk < chunks) {
                    console.log("1", "1")
                    loadNext();
                } else {
                    tmp_md5 = spark.end();
                    // console.log(tmp_md5)
                    // console.log(file.name + "的MD5值是：" + tmp_md5)
                    const formdata = new FormData();
                    formdata.append('file', file);
                    // console.log("formData-------",formdata);

                    const url = "http://localhost:9000/uploads?md5=" + tmp_md5 + "&UID=" + document.getElementById("username").innerText;
                    axios(url, {
                        method: 'POST',
                        body: formdata,
                        headers: {
                            // "Content-Type": "multipart/form-data",
                            "Authorization": localStorage.getItem('token'),
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            message.success(`${file.name} 文件上传成功`);
                            reject();
                        } else if (res.status === 204) {
                            message.warn(`${file.name} 您已上传过此文件`);
                            reject();
                        } else if (res.status === 203) {
                            file.uid = tmp_md5;
                            resolve(file);
                        } else {
                            message.error("未知错误");
                            reject();
                        }
                    })
                        .catch(error => resolve(file));
                }
            };
            fileReader.onerror = function () {
                console.warn('oops, something went wrong.');
            };

            function loadNext() {
                var start = currentChunk * chunkSize,
                    end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
            }

            loadNext();
        })
    }
}

export default MyUpload;
// ReactDOM.render(<MyUpload />, mountNode);