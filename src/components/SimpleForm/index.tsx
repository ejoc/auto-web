import { Button } from "@chakra-ui/button";
import { SimpleGrid } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Formik } from "formik";
import React from "react";
import { SelectControl, InputControl } from "../fields";

const options = [
  {
    value: "model_name",
    label: "Modelo",
  },
  {
    value: "brand_name",
    label: "Marca",
  },
  {
    value: "year",
    label: "Year",
  },
  {
    value: "mileage",
    label: "Kilometraje",
  },
  {
    value: "price",
    label: "Precio",
  },
];

export interface FormValues {
  searchTerm: string;
  option: string;
}

export interface SimpleFormProps {
  onSubmit(v: FormValues): void;
  initialValues: FormValues;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};
  if (!values.searchTerm) {
    errors.searchTerm = "Required";
  }
  if (!values.option) {
    errors.option = "Required";
  }
  return errors;
}

export default function SimpleForm({
  onSubmit,
  initialValues,
}: SimpleFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ handleSubmit }) => {
        return (
          <chakra.form onSubmit={handleSubmit} shadow="md" px={3} py={5}>
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={2}>
              <InputControl
                name="searchTerm"
                inputProps={{ placeholder: "Search" }}
              />

              <SelectControl
                name="option"
                selectProps={{ placeholder: "Select" }}
              >
                {options.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </SelectControl>

              <Button type="submit">Buscar</Button>
            </SimpleGrid>
          </chakra.form>
        );
      }}
    </Formik>
  );
}
