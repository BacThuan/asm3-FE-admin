export const productColumns = [
  { field: "_id", headerName: "ID", width: 230 },

  {
    field: "name",
    headerName: "Name",
    width: 250,
  },

  {
    field: "price",
    headerName: "Price",
    width: 200,
  },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => {
      return <img src={params.row.img} />;
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
];

export const orderColumns = [
  { field: "idUser", headerName: "ID User", width: 250 },
  {
    field: "name",
    headerName: "User Name",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
  {
    field: "total",
    headerName: "Total",
    width: 150,
  },
  {
    field: "delivery",
    headerName: "Delivery",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
  },
];
export const userColumns = [];
