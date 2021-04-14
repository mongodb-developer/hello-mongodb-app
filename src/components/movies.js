import React from 'react'
import { Table, Row, Cell, TableHeader, HeaderRow } from '@leafygreen-ui/table';

class Movies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: []
        };

        fetch('http://localhost:5000/')
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
          <TableHeader key="director" label="Director" dataType="string" />
          <TableHeader key="year" label="Year" dataType="number" />
          <TableHeader key="cast" label="Cast" dataType="string" />
        </HeaderRow>
      }
    >
      {({ datum }) => (
        <Row key={datum._id}>
          <Cell>{datum.title}</Cell>
          <Cell>{datum.director}</Cell>
          <Cell>{datum.year}</Cell>
          <Cell>{datum.cast}</Cell>
        </Row>
      )}
    </Table>
        </div>
      )
    }
}
export default Movies
