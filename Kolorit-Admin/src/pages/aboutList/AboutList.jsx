import "../productList/productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAbout, getAbout } from "../../redux/apiCalls";

export default function AboutList() {
  const dispatch = useDispatch();
  const abouts = useSelector((state) => state.about.abouts);

  useEffect(() => {
    getAbout(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteAbout(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "header",
      headerName: "About",
      width: 600,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.header}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/About/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">About List</h1>
        <Link to="/newabout">
          <button className="productAddButton">Create</button>
      </Link>
      </div>
      <DataGrid
        rows={abouts}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
