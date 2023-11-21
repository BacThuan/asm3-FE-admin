import "./home.css";
import { useEffect, useState } from "react";
import Widget from "../../components/widget/Widget";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../datatablesource";
import useFetch from "../../hooks/useFetch";
import Sidebar from "../../components/sidebar/Sidebar";
import { api } from "../../api/api";
const Home = () => {
  const { data, loading, error } = useFetch(api + "/orders?limit=8&admin=true");
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" url={api + "/users/count"} />
          <Widget type="order" url={api + "/orders/count"} />
          <Widget type="earning" url={api + "/orders/total"} />
        </div>

        <div className="listContainer">
          <div className="listTitle">Latest Orders</div>
          <div className="datatableHome">
            {data.length === 0 && "No data"}
            {data.length > 0 && (
              <DataGrid
                className="datagrid"
                rows={data}
                pageSize={8}
                columns={orderColumns}
                rowsPerPageOptions={[8]}
                getRowId={(row) => row._id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
