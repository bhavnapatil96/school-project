import React, { Component } from 'react';
import '../slider.css';
class Home extends Component {
    render() {
        return(
            <div >
                <div id="myCarousel" className="carousel slide slider" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                        <li data-target="#myCarousel" data-slide-to="3"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="https://furniture7.com/pub/media/catalog/category/appliances-electronics-rent-to-own-furniture-financing-leasing.jpg" alt="New york" style={{"width":"1650px"}}/>
                        </div>
                        <div className="item ">
                            <img src="https://www.drelectrical.co.uk/media/wysiwyg/YesBanner.jpg" alt="New york" style={{"width":"1650px"}}/>
                        </div>
                        <div className="item">
                            <img src="http://theyyampattilfurniture.in/image/cache/data/Category/ctgHome%20furniture-880x325.jpg" alt="Chicago" style={{"width":"1650px"}}/>
                        </div>
                        <div className="item">
                            <img src="https://nozzle.s3-ap-southeast-1.amazonaws.com/shop_21287/2014-New-Elegant-Fashion-Luxury-Cap-Sleeve-Floor-Length-Crystal-Chiffon-Women-Long-Prom-Dresses-Formal_1472726896_jpg_640x640.jpg" alt="Los Angeles" style={{"width":"1650px"}}/>
                        </div>
                    </div>
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <br/>
            </div>
        )
    }
}

export default Home;
