import React from 'react';
import Container from "@material-ui/core/Container";

import ExpensesSection from "./ExpensesSection";

export  function Home() {
  return(
      <>
          <Container>
                  <ExpensesSection/>
          </Container>
      </>
  );
}
