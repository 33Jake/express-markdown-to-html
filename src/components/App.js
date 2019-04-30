import React from "react";

import { Grid, Row, Col } from "react-flexbox-grid";

const App = () => (
  <Grid>
    <Row>
      <Col xs={12} md={10} lg={8} mdOffset={1} lgOffset={2}>
        <h1 class="text-center">{process.env.REACT_APP_NAME}</h1>
      </Col>
    </Row>
  </Grid>
);

export default App;
