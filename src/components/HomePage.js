/** @jsx jsx */
import { jsx } from '@emotion/core';
import Movies from './movies';
import { spacing } from '@leafygreen-ui/tokens';
import MongoDBInfo from './mongodbinfo';

export default function HomePage() {

    return <div>
        <MongoDBInfo />
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
