import React from "react";
import { Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { normalizeStripeObject } from "../utils/normalizeObjects";

function DataTable({ data }) {
  const navigate = useNavigate();

  const normalizedData = (data || [])
    .filter(Boolean)
    .map(normalizeStripeObject);

  const columns =
    normalizedData.length > 0 ? Object.keys(normalizedData[0]) : [];

  if (!normalizedData || normalizedData.length === 0) {
    return (
      <Card className="shadow-sm mt-4">
        <Card.Body className="text-center text-muted">
          No valid data to display
        </Card.Body>
      </Card>
    );
  }

  const handleClick = (row) => {
    navigate(`/details/${row.id}`, {
      state: row,
    });
  };

  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col}>
                      {col === "id" ? (
                        <span
                          onClick={() => handleClick(item)}
                          style={{
                            color: "#0d6efd",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {String(item[col])}
                        </span>
                      ) : (
                        String(item[col])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default DataTable;
