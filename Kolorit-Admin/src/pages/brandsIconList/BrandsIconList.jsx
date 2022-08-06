import "../productList/productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrandsIcon, getBrandsIcon } from "../../redux/apiCalls";

export default function BrandsIconList() {
  const dispatch = useDispatch();
  const brandsIcons = useSelector((state) => state.brandsIcon.brandsIcons);

  useEffect(() => {
    getBrandsIcon(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteBrandsIcon(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "brandsIcon",
      headerName: "BrandsIcon",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
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
            <Link to={"/brandsIcon/" + params.row._id}>
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
        <h1 className="productTitle">BrandsIcon List</h1>
        <Link to="/newBrandsIcon">
          <button className="productAddButton">Create</button>
      </Link>
      </div>
      <DataGrid
        rows={brandsIcons}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
