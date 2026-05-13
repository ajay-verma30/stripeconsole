import React from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  ListGroup,
  Accordion,
  Container,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function RecordDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <Container className="mt-5 text-center">
        <Card className="p-5 shadow-sm border-0">
          <div className="fs-1 mb-3">🔍</div>
          <h5 className="text-muted">No record data found</h5>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </Card>
      </Container>
    );
  }

  // Helper to render key-value pairs from objects
  const renderDetails = (obj) => {
    if (!obj || typeof obj !== "object")
      return <span className="text-muted">No data available</span>;
    return (
      <ListGroup variant="flush">
        {Object.entries(obj).map(([key, value]) => (
          <ListGroup.Item
            key={key}
            className="d-flex justify-content-between align-items-start px-0 border-light"
          >
            <span
              className="text-uppercase fw-bold text-muted small"
              style={{ letterSpacing: "0.5px" }}
            >
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-dark text-end ps-3">
              {typeof value === "object"
                ? JSON.stringify(value)
                : String(value)}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <div
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      className="py-4"
    >
      <Container>
        {/* BREADCRUMB / ACTION BAR */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <button
            className="btn btn-link text-decoration-none p-0 text-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back to Console
          </button>
          <Badge
            bg="info-subtle"
            className="text-info border border-info px-3 py-2 rounded-pill"
          >
            Stripe Resource: {state.object?.toUpperCase() || "RECORD"}
          </Badge>
        </div>

        {/* HEADER SUMMARY CARD */}
        <Card className="shadow-sm border-2 rounded-4 mb-4 overflow-hidden">
          <div className="p-2" />
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={8}>
                <h2 className="fw-bold mb-1 text-dark">
                  {state.name || state.description || "Unnamed Record"}
                </h2>
                <div className="d-flex align-items-center gap-2">
                  <code className="bg-light text-primary px-2 py-1 rounded">
                    {state.id}
                  </code>
                  <span className="text-muted">|</span>
                  <span className="text-muted small">
                    Created:{" "}
                    {state.created
                      ? new Date(state.created * 1000).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </Col>
              <Col md={4} className="text-md-end mt-3 mt-md-0">
                {state.email && (
                  <div className="text-dark fw-bold">{state.email}</div>
                )}
                <Badge
                  bg={state.livemode ? "success" : "warning"}
                  className="rounded-pill"
                >
                  {state.livemode ? "Live Mode" : "Test Mode"}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* DETAILS GRID */}
        <Row className="g-4 mb-4">
          <Col lg={6}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Header className="bg-white border-0 pt-4 px-4">
                <h6 className="fw-bold text-uppercase text-muted small mb-0">
                  Primary Information
                </h6>
              </Card.Header>
              <Card.Body className="p-4 pt-2">
                {renderDetails({
                  currency: state.currency,
                  description: state.description,
                  phone: state.phone,
                  delinquent: state.delinquent,
                  tax_status: state.tax_status,
                })}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Header className="bg-white border-0 pt-4 px-4">
                <h6 className="fw-bold text-uppercase text-muted small mb-0">
                  Address & Billing
                </h6>
              </Card.Header>
              <Card.Body className="p-4 pt-2">
                {renderDetails(state.address || state.billing_details?.address)}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SECONDARY SETTINGS */}
        <Card className="shadow-sm border-0 rounded-4 mb-4">
          <Card.Header className="bg-white border-0 pt-4 px-4">
            <h6 className="fw-bold text-uppercase text-muted small mb-0">
              Metadata & Configuration
            </h6>
          </Card.Header>
          <Card.Body className="p-4 pt-2">
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted fw-bold d-block mb-2">
                    INVOICE SETTINGS
                  </small>
                  <div className="p-3 bg-light rounded-3 border small">
                    {JSON.stringify(state.invoice_settings || {}, null, 2)}
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <small className="text-muted fw-bold d-block mb-2">
                    METADATA
                  </small>
                  <div className="p-3 bg-light rounded-3 border small">
                    {JSON.stringify(state.metadata || {}, null, 2)}
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* RAW DATA ACCORDION */}
        <Accordion
          flush
          className="shadow-sm rounded-4 overflow-hidden border-0"
        >
          <Accordion.Item eventKey="0" className="border-0">
            <Accordion.Header className="small fw-bold text-muted">
              VIEW RAW API RESPONSE
            </Accordion.Header>
            <Accordion.Body className="bg-dark p-0">
              <pre
                className="text-warning m-0 p-4"
                style={{
                  fontSize: "0.85rem",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {JSON.stringify(state, null, 2)}
              </pre>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}

export default RecordDetails;
