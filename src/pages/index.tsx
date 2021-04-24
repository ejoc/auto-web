import React, { useCallback } from "react";
import { useHistory } from "react-router";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
// import SearchForm from '../components/SearchForm'
import SimpleForm from "../components/SimpleForm";

export default function HomePage() {
  const history = useHistory();
  const handleSubmit = useCallback(
    (values) => {
      const qs = new URLSearchParams(`${values.option}=${values.searchTerm}`);
      history.push({ pathname: "/vehicles", search: qs.toString() });
    },
    [history]
  );
  return (
    <Layout>
      <Hero>
        {/* <SearchForm /> */}
        <SimpleForm
          onSubmit={handleSubmit}
          initialValues={{ option: "", searchTerm: "" }}
        />
      </Hero>
    </Layout>
  );
}
