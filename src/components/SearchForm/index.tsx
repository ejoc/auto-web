import { Button } from "@chakra-ui/button";
import { SimpleGrid } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Formik } from "formik";
import React from "react";
import { useVehicleModelsQuery, useVehicleBrandsQuery } from "../../hooks";
import { formatMoney } from "../../utils";
import { SelectControl, InputControl } from "../fields";

const currentYear = new Date().getFullYear();

export interface FormValues {
  searchTerm: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
}

export default function SearchForm() {
  const { data: models } = useVehicleModelsQuery();
  const { data: brands } = useVehicleBrandsQuery();
  const initialValues: FormValues = {
    searchTerm: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, values }) => {
        console.log("values", values);
        return (
          <chakra.form onSubmit={handleSubmit} shadow="md" px={3} py={5}>
            <SimpleGrid columns={{ base: 1, lg: 7 }} gap={2}>
              <InputControl name="searchTerm" />

              <SelectControl
                name="brand"
                selectProps={{ placeholder: "Marca" }}
              >
                {brands?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectControl>

              <SelectControl
                name="model"
                selectProps={{ placeholder: "Modelo" }}
              >
                {models
                  ?.filter((item) =>
                    values.brand ? item.brand_id === Number(values.brand) : item
                  )
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </SelectControl>

              <SelectControl name="year" selectProps={{ placeholder: "Año" }}>
                {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </SelectControl>

              <SelectControl
                name="mileage"
                selectProps={{ placeholder: "Kilometraje" }}
              >
                {Array.from({ length: 5 }, (_, i) => 15000 * (i + 1)).map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </SelectControl>

              <SelectControl
                name="price"
                selectProps={{ placeholder: "Precio" }}
              >
                {Array.from({ length: 5 }, (_, i) => 500000 * (i + 1)).map(
                  (item) => (
                    <option key={item} value={item}>
                      {formatMoney(item)}
                    </option>
                  )
                )}
              </SelectControl>

              <Button type="submit">Buscar</Button>
            </SimpleGrid>
          </chakra.form>
        );
      }}
    </Formik>
  );
}
