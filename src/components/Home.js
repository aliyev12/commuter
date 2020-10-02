import React from "react";
import { Busses } from "./Busses";
import { LastUpdated } from "./LastUpdated";

export function Home() {
  return (
    <>
      <LastUpdated />
      <Busses />
    </>
  );
}
