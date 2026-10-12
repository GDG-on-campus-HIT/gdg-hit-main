import React, { Suspense } from "react";
import Login from "./Login";

const Page = () => {
  return (
    <div>
      <Suspense>
        <Login />
      </Suspense>
    </div>
  );
};

export default Page;
