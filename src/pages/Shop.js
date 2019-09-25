import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default class Shop extends Component {
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();
    state = {
        shop: {},
        location: {
            lat: 0,
            lgn: 0
        },
        menus: []
    }

    async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            const response = await axios.get('https://shop-backendapi.herokuapp.com/api/shop/' + id, {
                cancelToken: this.source.token
            });
            console.log(response.data.data)
            this.setState({
                shop: response.data.data,
                location: response.data.data.location,
                menus: response.data.data.menus,
            })

        } catch (thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled');
              } else {
                console.log(thrown)
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
                    <h1>{this.state.shop.name}</h1>
                    <div className="row mt-4">

                        {
                            this.state.menus.map((menus, index) => {
                                return (
                                    <div className="col-md-4" key={menus._id}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-me-6">
                                                        <h5 className="card-title">{index + 1}) {menus.name}</h5>
                                                        <div>
                                                            <p className="card-text">ราคา {menus.price.$numberDecimal} บาท</p>
                                                            <Button variant="primary">ซื้อเลย</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                )
                            })
                        }


                    </div>
                </div>

            </div>
        )
    }
}