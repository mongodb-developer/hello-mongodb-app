import React from 'react'
import { Subtitle } from '@leafygreen-ui/typography';
import { LogoMark, AtlasLogoMark } from '@leafygreen-ui/logo';

class AtlasStatus extends React.Component {

    constructor(props) {
        super(props)
        console.log("-----> service url----> " + process.env.REACT_APP_MOVIES_SERVICE_URL)
        this.state = {
            mongodb: { 'connected': false} 
            ,service: process.env.REACT_APP_MOVIES_SERVICE_URL
        };
        console.log("AtlasStatus state: " + this.state)
    }

    componentDidMount() {
        fetch(this.state.service+"/mongodb-info")
        .then(res => res.json())
        .then((data) => {
          this.setState({ mongodb: data.mongodb })
        })
        .catch(console.log)
    }


    render() {
      const renderMongoDBLogo = () => {
        if (this.state.mongodb.service==='atlas') {
          return ( <AtlasLogoMark style={{display: 'flex', 'marginLeft': 'auto'}}></AtlasLogoMark>)
        } else {
          return (<LogoMark style={{display: 'flex', 'marginLeft': 'auto'}}></LogoMark>)
        }
      }
      
      return (
        <div style={{display: 'flex', 'marginLeft': 'auto'}}>
        
        {renderMongoDBLogo()}        
        <Subtitle style={{ 'marginLeft': '15px', 'color': '#09804C'}} > { this.state.mongodb.connected ? 'connected' : 'disconnected'}
        </Subtitle>
        </div>
      )
    }
}
export default AtlasStatus
