import React from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ExpensesSection from "./ExpensesSection";

export  function Home() {
  return(
      <>
          <Container>
              <Typography style={{backgroundColor:"blueviolet",height:"100vh"}}>
                  <ExpensesSection/>
              </Typography>
          </Container>
      </>
  );
}
