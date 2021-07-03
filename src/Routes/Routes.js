import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = lazy(() => import("../features/HomePage/Home"));
const DetailsPage = lazy(() => import("../features/CarDetailsPage/CarDetailsPage"))

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detailsPage/:id" component={DetailsPage} />
    </Suspense>
  );
};

export default Routes;
