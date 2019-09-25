import React, { Component } from 'react'
import axios from 'axios';

import Shop from '../components/Shop';



export default class Home extends Component {
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    state = {
        name: 'Teerasak.N',
        shops: []
    }

    async componentDidMount() {
        this.getData()
    }

    getData = async () => {
        try {
            const response = await axios.get('https://shop-backendapi.herokuapp.com/api/shop', {
                cancelToken: this.source.token
            });
            //console.log(response.data.data)
            this.setState({
                shops: response.data.data
            })

        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled');
            } else {
                console.log(error)
            }
        }
    }
    componentWillUnmount() {
        this.source.cancel()
    }

    render() {
        return (
            <div>

                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Shop shop={this.state.shops} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
