import React from 'react'
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';

class AtlasStatus extends React.Component {

    constructor(props) {
        super(props)
        console.log("-----> service url----> " + process.env.REACT_APP_MOVIES_SERVICE_URL)
        this.state = {
            atlas: { 'connected': false} 
            ,service: process.env.REACT_APP_MOVIES_SERVICE_URL
        };
        console.log("AtlasStatus state: " + this.state)
    }

    componentDidMount() {
        fetch(this.state.service+"/mongodb-info")
        .then(res => res.json())
        .then((data) => {
          this.setState({ atlas: data.atlas })
        })
        .catch(console.log)
    }


    render() {
      return (
        <div style={{'margin-left': 'auto'}}> { this.state.atlas.connected ? 'connected' : 'disconnected'}
        </div>
      )
    }
}
export default AtlasStatus
