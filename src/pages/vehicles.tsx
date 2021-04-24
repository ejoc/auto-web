import React, { useCallback, useMemo } from "react";
import { chakra, Spinner, Text } from "@chakra-ui/react";
import { useHistory } from "react-router";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import SimpleForm from "../components/SimpleForm";
import { useQueryParams, useVehiclesQuery } from "../hooks";

export default function VehiclesPage() {
  const history = useHistory();
  const query = useQueryParams();
  const { data, isLoading, error } = useVehiclesQuery({
    variables: { qs: history.location.search },
    options: {
      enabled: !!history.location.search,
    },
  });

  const handleSubmit = useCallback(
    (values) => {
      const qs = new URLSearchParams(`${values.option}=${values.searchTerm}`);
      history.push({
        pathname: history.location.pathname,
        search: qs.toString(),
      });
    },
    [history]
  );

  const initialValues = useMemo(() => {
    const [option, searchTerm] = query.toString().split("=");
    return {
      searchTerm: searchTerm,
      option: option,
    };
  }, [query]);

  if (error) return <div>An error has occurred: {error.message}</div>;
  return (
    <Layout>
      <Hero>
        <SimpleForm onSubmit={handleSubmit} initialValues={initialValues} />
      </Hero>
      <chakra.div maxW="5xl" mx="auto" mt={6}>
        {isLoading && (
          <chakra.div d="flex" alignItems="center" justifyContent="center">
            <Spinner />
          </chakra.div>
        )}
        {data && <Text textAlign="center">{JSON.stringify(data)}</Text>}
      </chakra.div>
    </Layout>
  );
}
