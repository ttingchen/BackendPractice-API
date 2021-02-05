import React from 'react';
class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {datas: []};
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        const that = this;
        const axios = require('axios');

        axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot', {
            params: {
                $top:30,
                $format: 'JSON'
            }
        })
        .then(function (response) {
            // handle success
            console.log(response.data);
            that.setState({datas:response.data});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    };

    listItems = () =>
    this.state.datas.map(data => (
      <div className="card" key={data.ID}>
        <h1>{data.Name}</h1>
        <p>{data.Description}</p>
      </div>
    ));
        
    render() {
        return (
            <div className="App">
              <div className="container">{this.listItems()}</div>
            </div>
        );
    }
  }

  export default Api;