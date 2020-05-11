import React, { Component } from 'react';
import ReactSwipe from 'react-swipe'

export default class HomeSlider extends Component {
    render() {
        let reactSwipeEl;
        let opts = { 
            continuous: true,
            auto: 2000,
            callback: () => {} }
        return (<div class="home-slider">
            <ReactSwipe
                className="carousel"
                swipeOptions={opts}
                ref={el => (reactSwipeEl = el)}
            >
                {
                    this.props.list.map((item,index)=>{
                        return (<div key={index}>
                            <img src={item}></img>
                        </div>)
                    })
                }
            </ReactSwipe>
        </div>)
    }
}