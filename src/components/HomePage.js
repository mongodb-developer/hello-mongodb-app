/** @jsx jsx */
import { jsx } from '@emotion/core';
import Movies from './movies';

export default function HomePage() {

    return <div>

        <Movies />
        </div>
    }


/*

                <Table
          data={datum}
          columns={[
            <TableHeader label=name />,
            <TableHeader label=age />,
            <TableHeader label=color sortBy={datum => datum.color} />,
            <TableHeader label=location />,
          ]}
        >
          {({ datum }) => (
            <Row key={datum.name}>
              <Cell>{datum.name}</Cell>
              <Cell>{datum.age}</Cell>
              <Cell>{datum.color}</Cell>
              <Cell>{datum.location}</Cell>
            </Row>
          )}
        </Table>
*/
