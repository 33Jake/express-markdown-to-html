import React from "react";

import { Grid, Row, Col } from "react-flexbox-grid";

import ConvertForm from "./ConvertForm";

const App = () => (
  <Grid>
    <Row>
      <Col xs={12} md={10} lg={8} mdOffset={1} lgOffset={2}>
        <h1>{process.env.REACT_APP_NAME}</h1>
        <ConvertForm />
      </Col>
    </Row>
  </Grid>
);

export default App;
