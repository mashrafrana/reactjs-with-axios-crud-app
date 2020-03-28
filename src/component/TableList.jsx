import React from 'react';
import { Table} from 'react-bootstrap';

const TableList = props => {

    return(
        <Table striped hover>
            <thead>
              <tr>
                {props.thName.map((prop, key) => {
                  return <th key={key}>{prop}</th>;
                })}
              </tr>
            </thead>
            <tbody>

                  {props.tdData}
            </tbody>
          </Table>
        );
    };

export default TableList;