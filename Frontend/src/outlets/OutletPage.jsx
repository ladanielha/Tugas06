import React from "react";
import {Outlet} from "react-router-dom";
import WidgetUserSignInModal from "../widgets/user/WidgetUserSignInModal";
import LibComponentNavbar from "../libs/components/LibComponentNavbar";

const OutletPage = () => {
  return (
    <div>
    <LibComponentNavbar/>
    <Outlet />
    <WidgetUserSignInModal/>
  </div>
  );
};

export default OutletPage;
