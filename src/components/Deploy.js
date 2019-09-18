import React from 'react';
import PropTypes from 'prop-types';
import {ForLayout1,ForLayout2} from '../containers/LayoutContainers';

const axios = require('axios');

class Deploy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            layout:"layout2",
            gis:[],
            textLables:[],
            images:[],
            open: false
        };
        this.loadPage(this.props.match.params.pageId)
        this.props.setIsDesigner(false)

    }

    loadPage = (PageId) => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8088/v1/loadPage/' + PageId
        }).then((response) => { //不用箭頭的話會讀不到this.state     //handle success
            this
            .props
            .loadPage(response.data.ResultMessage.PageData)

        })
            .catch(function (response) { //handle error
                console.log(response);
            });
    }

    render() {
        const {classes} = this.props; // classes這個常數 == props.classes
        let dashboard_layout
        if(this.props.layout==="layout1"){
            dashboard_layout=<ForLayout1/>
        }else if(this.props.layout==="layout2"){
            dashboard_layout=<ForLayout2/>
        }
        return (
            <div>


                <main id="main">
                    {dashboard_layout}

                </main>

            </div>
        );
    }
}

Deploy.propTypes = {
    classes: PropTypes.object.isRequired
};

export default Deploy;