import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { api } from "../../api/api";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();

  const { data, loading, error } = useFetch(`${api}/${path}?admin=true`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        await axios.delete(`/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path === "orders" ? (
              <div className="viewButton">View</div>
            ) : (
              <React.Fragment>
                <Link
                  to={`/${path}/new?id=${params.row._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="viewButton">Edit</div>
                </Link>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row._id)}
                >
                  Delete
                </div>
              </React.Fragment>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {path != "orders" && (
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        )}
      </div>
      {data.length === 0 && "No data"}
      {data.length > 0 && (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
