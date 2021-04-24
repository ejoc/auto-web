import { QueryKey, useQuery, UseQueryOptions } from "react-query";

const endpoint = process.env.ENDPOINT ?? "http://localhost:3000";

export interface VehicleModel {
  id: number;
  name: string;
  brand_id: number;
}

export interface VehicleBrand {
  id: number;
  name: string;
}

export interface Vehicle {
  id: number;
  model_name: string;
  brand_name: string;
  year: number;
  mileage: number;
  price: number;
}

export function useVehicleModelsQuery() {
  return useQuery<VehicleModel[]>("models", () =>
    fetch(`${endpoint}/vehicle_models`).then((res) => res.json())
  );
}

export function useVehicleBrandsQuery() {
  return useQuery<VehicleBrand[]>("brands", () =>
    fetch(`${endpoint}/vehicle_brands`).then((res) => res.json())
  );
}

async function fetchVehicles({ queryKey }: any) {
  // eslint-disable-next-line
  const [_key, { variables }] = queryKey;
  const res = await fetch(`${endpoint}/vehicles${variables.qs}`);
  return res.json();
}

interface UseVehiclesQueryVariables {
  qs: string;
}

interface UseVehiclesQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> {
  variables: UseVehiclesQueryVariables;
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
}

export function useVehiclesQuery({
  variables,
  options,
}: UseVehiclesQuery<Vehicle, Error>) {
  return useQuery<Vehicle, Error>(
    ["vehicles", { variables }],
    fetchVehicles,
    options
  );
}
