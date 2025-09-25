import React from "react";
import Contents from "./_components/Contents";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const storeID = await cookieStore.get("STORE_ID");
  console.log(storeID);

  return <Contents store={storeID?.value} />;
};

export default page;
