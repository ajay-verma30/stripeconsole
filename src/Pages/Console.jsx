import React, { useState } from "react";
import { Button, Container, Form, Card, Row, Col, InputGroup, Spinner, Badge } from "react-bootstrap";
import { fetchStripeData } from '../Services/StripeServices';
import DataTable from "../Components/DataTable";

const STRIPE_RESOURCES = [
  { label: "Customers", value: "customers", icon: "👥" },
  { label: "Charges", value: "charges", icon: "💳" },
  { label: "Invoices", value: "invoices", icon: "📄" },
  { label: "Payments", value: "payment_intents", icon: "💰" }
];

const VALID_KEY_REGEX = /^rk_(test|live)_[a-zA-Z0-9]+$/;

function Console() {
  const [restrictedKey, setRestrictedKey] = useState("");
  const [isKeySaved, setIsKeySaved] = useState(!!sessionStorage.getItem("key"));
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    resource: "customers",
    startDate: "",
    endDate: "",
    limit: "25"
  });

  const [fetchedData, setData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQueryParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    const trimmedKey = restrictedKey.trim();

    if (VALID_KEY_REGEX.test(trimmedKey)) {
      sessionStorage.setItem("key", trimmedKey);
      setIsKeySaved(true);
    } else {
      alert("Invalid Format: Use a valid Stripe Restricted Key (rk_...).");
    }
  };

  const handleExecuteQuery = async () => {
    setLoading(true);
    try {
      const key = sessionStorage.getItem("key");
      const response = await fetchStripeData({
        resource: queryParams.resource,
        restrictedKey: key,
        limit: queryParams.limit,
        startDate: queryParams.startDate,
        endDate: queryParams.endDate,
      });
      setData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="py-4 px-lg-5" style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold text-dark mb-1">Stripe Data Console</h2>
          <p className="text-muted mb-0">Query and export your Stripe financial records</p>
        </div>
        {isKeySaved ? (
          <Badge bg="success-subtle" className="text-success border border-success p-2 px-3 rounded-pill">
            ● Connection Active
          </Badge>
        ) : (
          <Badge bg="danger-subtle" className="text-danger border border-danger p-2 px-3 rounded-pill">
            ○ Key Required
          </Badge>
        )}
      </div>

      <Row className="g-4">
        {/* Sidebar Configuration */}
        <Col lg={3}>
          <div className="sticky-top" style={{ top: "2rem" }}>
            <Card className="border-0 shadow-sm rounded-4 mb-4">
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-3 text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                  Authentication
                </h6>
                <Form onSubmit={handleSaveKey}>
                  <Form.Group>
                    <Form.Label className="small text-secondary">Restricted API Key</Form.Label>
                    <InputGroup className="mb-2">
                      <Form.Control
                        type="password"
                        placeholder="rk_test_..."
                        className="bg-light border-0 shadow-none"
                        style={{ fontSize: "0.9rem" }}
                        value={restrictedKey}
                        onChange={(e) => setRestrictedKey(e.target.value)}
                      />
                      <Button variant="dark" type="submit" className="px-3">Save</Button>
                    </InputGroup>
                    {isKeySaved && <small className="text-success">Key encrypted in session storage</small>}
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-3 text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                  Query Filters
                </h6>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-secondary">Start Date</Form.Label>
                  <Form.Control type="date" name="startDate" className="bg-light border-0" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-secondary">End Date</Form.Label>
                  <Form.Control type="date" name="endDate" className="bg-light border-0" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="small text-secondary">Batch Size</Form.Label>
                  <Form.Select name="limit" value={queryParams.limit} className="bg-light border-0" onChange={handleInputChange}>
                    {[10, 25, 50, 100].map(num => (
                      <option key={num} value={num}>{num} Records</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Main Interface Area */}
        <Col lg={9}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="p-4 bg-white border-bottom">
              <h6 className="fw-bold mb-4 text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                Select Stripe Resource
              </h6>
              <Row className="g-3">
                {STRIPE_RESOURCES.map((res) => (
                  <Col md={3} key={res.value}>
                    <div
                      onClick={() => setQueryParams(prev => ({ ...prev, resource: res.value }))}
                      style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                      className={`p-3 rounded-3 text-center border-2 border ${
                        queryParams.resource === res.value 
                        ? "bg-primary-subtle border-primary text-primary" 
                        : "bg-white border-light text-secondary"
                      }`}
                    >
                      <div className="fs-4 mb-1">{res.icon}</div>
                      <div className="fw-bold small">{res.label}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            <Card.Body className="p-4 bg-light">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="bg-white p-3 rounded-circle shadow-sm me-3">
                    <span className="fs-4">🚀</span>
                  </div>
                  <div>
                    <div className="fw-bold text-dark">Ready to Fetch</div>
                    <div className="small text-muted">
                      Requesting {queryParams.limit} {queryParams.resource}
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  variant={isKeySaved ? "primary" : "secondary"} 
                  className="px-5 rounded-pill fw-bold shadow"
                  disabled={!isKeySaved || loading}
                  onClick={handleExecuteQuery}
                >
                  {loading ? (
                    <><Spinner size="sm" className="me-2" /> Processing...</>
                  ) : (
                    "Run Query"
                  )}
                </Button>
              </div>
              {!isKeySaved && (
                <div className="text-center mt-3">
                  <small className="text-danger">⚠️ Please save your Restricted API Key to enable queries.</small>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Results Section */}
          <div className="bg-white rounded-4 shadow-sm p-4 overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Query Results</h5>
              <div className="small text-muted">Total records: {fetchedData.length}</div>
            </div>
            <DataTable data={fetchedData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Console;