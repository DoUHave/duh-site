import React from "react";
import CatResults from "./CatResults";
import Constant from '../util/Constant';
import { useParams } from "react-router-dom";

function CategoryItems(props) {
  const { route } = useParams();

  return (
    <div className="CategoryItems">
      <CatResults
        category={Constant.ROUTE_CATMAP[route]}
        isAuth={props.isAuth}
        userName={props.userName}
        firstName={props.firstName}
        userId={props.userId}
        token={props.token}
      />
    </div>
    );
}


export default CategoryItems;
