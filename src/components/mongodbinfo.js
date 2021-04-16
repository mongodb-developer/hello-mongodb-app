import React from 'react'
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';

class MongoDBInfo extends React.Component {

    constructor(props) {
        super(props)
        console.log("-----> service url----> " + process.env.REACT_APP_MOVIES_SERVICE_URL)
        this.state = {
            minfo: { "dbstats" : {}, "collstats"  : { "ns" : "NOT SET", "count" : "nil", "totalIndexSize" : "nil" }, "atlas" : {} }
            ,service: process.env.REACT_APP_MOVIES_SERVICE_URL
        };
        console.log("MongoDBInfo state: " + this.state)
    }

    componentDidMount() {
        fetch(this.state.service+"/mongodb-info")
        .then(res => res.json())
        .then((data) => {
          this.setState({ minfo: data })
        })
        .catch(console.log)
    }


    render() {
      return (
        <div>
          <h1>{ this.state.minfo.collstats.ns }</h1>
            <div>
          <span style={{ margin: spacing[4] }}>
          <span style={{ color: uiColors.gray.light1 }}>COLLECTION SIZE:</span>
          <span style={{ "font-weight": 'bold' }}>{ this.state.minfo.collstats.size}MB</span>
            </span>

          <span style={{ margin: spacing[4] }}>
          <span style={{ color: uiColors.gray.light1 }}>TOTAL DOCUMENTS:</span>
          <span style={{ "font-weight": 'bold' }}>{ this.state.minfo.collstats.count} </span>
            </span>

          <span style={{ margin: spacing[4] }}>
          <span style={{ color: uiColors.gray.light1 }}>INDEX TOTAL SIZE:</span>
          <span style={{ "font-weight": 'bold' }}>{ this.state.minfo.collstats.totalIndexSize}MB</span>
            </span>

              </div>
        </div>
      )
    }
}
export default MongoDBInfo
