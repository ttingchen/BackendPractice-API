import React from 'react';
class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            count: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.canLoad = true;
    }

    componentDidMount() {
        this.getItems();
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);
        if (windowBottom === docHeight && this.canLoad) {
            this.canLoad = false;
            this.getItems();
            //console.log("bottom!");
        } else {
            //console.log("not at bottom!");
        }
    }

    getItems = () => {
        const that = this;
        const axios = require('axios');

        axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot', {
            params: {
                $top:30,
                $skip:`${that.state.count}`,
                $format: 'JSON'
            }
        })
        .then(function (response) {
            // handle success
            //console.log(response.data);
            //that.setState({datas:response.data});
            that.setState({
                datas:that.state.datas.concat(response.data),
                count:that.state.count+30
            });
            that.canLoad = true;
            console.log(that.state.count);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    };

    listItems = () =>
    this.state.datas.map(data => (
      <div className="card" key={data.ScenicSpotID}>
        <h1>{data.ScenicSpotName}</h1>
        <p>{data.Description}</p>
      </div>
    ));
        
    render() {
        return (
            <div className="container">{this.listItems()}</div>
        );
    }
  }

  export default Api;