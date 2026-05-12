import React from "react";
import {
  Table,
  Card,
} from "react-bootstrap";

function DataTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="shadow-sm mt-4">
        <Card.Body className="text-center text-muted">
          No data available
        </Card.Body>
      </Card>
    );
  }

  // Extract table columns dynamically
  const columns = Object.keys(data[0]);

  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <div className="table-responsive">
          <Table
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map(
                (item, index) => (
                  <tr key={index}>
                    {columns.map(
                      (col) => (
                        <td key={col}>
                          {typeof item[
                            col
                          ] === "object"
                            ? JSON.stringify(
                                item[
                                  col
                                ]
                              )
                            : String(
                                item[
                                  col
                                ]
                              )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default DataTable;