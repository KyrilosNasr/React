import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/Auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === 'session Expired') {
      submit(null, { action: "/logout" });
      return
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(() => submit(null, { action: "/logout" }), tokenDuration);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
