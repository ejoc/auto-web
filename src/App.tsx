import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages";
import VehiclesPage from "./pages/vehicles";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/vehicles">
            <VehiclesPage />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  </QueryClientProvider>
);

// /:option/:searchTerm
