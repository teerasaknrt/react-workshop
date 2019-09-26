import React from 'react'
import { Link } from "react-router-dom";
//import Carousel from 'react-bootstrap/Carousel'

const Shop = ({ shop }) => {

    return (
        <div>
            {/**
            <div className="container py-4">
                <Carousel>
                    {shop.map((data, index) => (
                        <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={data.photo}
                            alt="Third slide"
                            width="100%"
                            height="300"
                        />
                    </Carousel.Item>
                        
                    ))}                    
                </Carousel>
            </div>
            
            */}
            

            <div className="album py-4 ">

                <div className="container">
                    <div className="row">
                        {shop.map((data, index) => (

                            <div className="col-md-3" key={index}>
                                <div className="card mb-4 shadow-sm">
                                    <img src={data.photo} className="rounded" alt="..." width="100%" height="175" />
                                    <div className="card-body">
                                        <h6 className="card-title">{data.name}</h6>

                                        <Link className="btn btn-warning btn-sm" to={{ pathname: '/shop/' + data.id }} >
                                            View Munu
                                        </Link>
                                        {/*
                                        <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/place/15°13'21.2"N+104°52'27.6"E/@${data.location.lat},${data.location.lgn},17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d15.2225434!4d104.8743425`} className="btn btn-primary">Location</a>
                                         */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
};


export default Shop
