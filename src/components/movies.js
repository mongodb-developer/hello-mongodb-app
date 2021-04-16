import React from 'react'
import { Table, Row, Cell, TableHeader, HeaderRow } from '@leafygreen-ui/table';

class Movies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            service: process.env.REACT_APP_MOVIES_SERVICE_URL
        };
        console.log("Movies state: " + this.state)
    }

    UNSAFE_componentWillMount() {
        fetch(this.state.service+"find")
        .then(res => res.json())
        .then((data) => {
          this.setState({ movies: data })
        })
        .catch(console.log)
    }


    render() {
      return (
        <div>
          <center><h1>Movies List</h1></center>
        <Table
      data={this.state.movies}
      columns={
        <HeaderRow>
          <TableHeader key="title" label="Title" dataType="string" />
          <TableHeader key="directors" label="Directors" dataType="string" />
          <TableHeader key="year" label="Year" dataType="string" />
          <TableHeader key="cast" label="Cast" dataType="string" />
          <TableHeader key="plot" label="Plot" dataType="string" />
        </HeaderRow>
      }
    >
      {({ datum }) => (
        <Row key={datum._id}>
          <Cell>{datum.title}</Cell>
          <Cell>{datum.directors}</Cell>
          <Cell>{datum.year}</Cell>
          <Cell>{datum.cast}</Cell>
          <Cell>{datum.plot}</Cell>
        </Row>
      )}
    </Table>
        </div>
      )
    }
}
export default Movies
