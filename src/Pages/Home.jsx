import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Navbar,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();
  const handleconsole = () => {
    nav("/console");
  };
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      {/* Navigation */}
      <Navbar bg="white" expand="lg" className="border-bottom sticky-top py-3">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold text-primary">
            Stripe<span className="text-dark">Fetcher</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="py-5 bg-white">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6}>
              {/* <Badge bg="primary-subtle" text="primary" className="mb-3 px-3 py-2 border border-primary-subtle">
                Beta: Reconciliation Engine
              </Badge> */}
              <h1 className="display-4 fw-bold mb-4">
                Fetch Stripe Data <br />
                <span className="text-primary">Without the Code.</span>
              </h1>
              <p className="lead text-secondary mb-4">
                A secure, client-side UI to retrieve payments, subscriptions,
                and customers. No database, no storage—just your API key and the
                data you need.
              </p>
              <div className="d-grid d-md-flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-5"
                  onClick={handleconsole}
                >
                  Launch Fetcher
                </Button>
                <Button variant="light" size="lg" className="px-5 border">
                  View Repo
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0">
              <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Header className="bg-dark text-white py-3">
                  <div className="d-flex gap-2">
                    <div
                      className="rounded-circle bg-danger"
                      style={{ width: 12, height: 12 }}
                    ></div>
                    <div
                      className="rounded-circle bg-warning"
                      style={{ width: 12, height: 12 }}
                    ></div>
                    <div
                      className="rounded-circle bg-success"
                      style={{ width: 12, height: 12 }}
                    ></div>
                  </div>
                </Card.Header>
                <Card.Body className="p-4 bg-light">
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">
                      RESTRICTED_API_KEY
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="rk_live_••••••••••••••••"
                      disabled
                    />
                  </Form.Group>
                  <div className="p-3 bg-white border rounded shadow-sm">
                    <pre className="mb-0" style={{ fontSize: "12px" }}>
                      <code>{`{
  "object": "list",
  "data": [
    { "id": "pi_3MWA...", "amount": 2000, "status": "succeeded" },
    { "id": "pi_3MWB...", "amount": 4500, "status": "processing" }
  ]
}`}</code>
                    </pre>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container className="py-5">
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Why use our Fetcher?</h2>
              <p className="text-muted">
                Built for speed, privacy, and technical ease.
              </p>
            </Col>
          </Row>
          <Row>
            {[
              {
                title: "No Storage",
                text: "We never store your keys or data. It stays in your browser memory and disappears on refresh.",
                icon: "🛡️",
              },
              {
                title: "Reconciliation Ready",
                text: "Quickly compare Stripe IDs with your internal records using our fetch mechanism.",
                icon: "⚖️",
              },
              {
                title: "Restricted Access",
                text: "Optimized for Stripe Restricted Keys to ensure least-privilege security.",
                icon: "🔑",
              },
            ].map((feature, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="h-100 border-0 shadow-sm p-3">
                  <Card.Body>
                    <div className="fs-1 mb-3">{feature.icon}</div>
                    <Card.Title className="fw-bold">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-5 bg-white">
        <Container>
          <div className="bg-primary text-white rounded-5 p-5 shadow">
            <Row className="align-items-center text-center text-md-start">
              <Col md={8}>
                <h2 className="fw-bold">Ready to fetch your first dataset?</h2>
                <p className="mb-0 opacity-75">
                  Connect your Stripe Restricted Key and start analyzing in
                  seconds.
                </p>
              </Col>
              <Col md={4} className="text-md-end mt-4 mt-md-0">
                <Button
                  variant="light"
                  size="lg"
                  className="fw-bold text-primary px-4"
                  onClick={handleconsole}
                >
                  Get Started Now
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4 border-top">
        <Container className="text-center">
          <p className="text-muted mb-0 small">
            © {new Date().getFullYear()} StripeFetcher. Not affiliated with
            Stripe, Inc.
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default Home;
