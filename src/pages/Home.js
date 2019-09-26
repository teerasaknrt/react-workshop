import React, { Component } from 'react'
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'  //Button


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
                <Jumbotron>
                    <div className="container">
                        <h1>สั่งอาหารเดลิเวอรี่จากร้านใกล้บ้านคุณ สั่งเลย!</h1>
                        <p>
                        อิ่มอร่อยกับอาหารมากมายใกล้บ้านคุณ จากร้านที่ดีที่สุด
                    </p>
                        <p>
                            <Button variant="primary">เลือกสินค้าเลย</Button>
                        </p>
                    </div>


                </Jumbotron>

                <div className="container">
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


const styles = {
    bottom: {
        backgroundcolor: '#fc3600'
    }
}