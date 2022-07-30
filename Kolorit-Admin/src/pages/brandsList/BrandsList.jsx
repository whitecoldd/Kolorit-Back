import "../productList/productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrand } from "../../redux/apiCalls";

export default function BrandList() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);

  useEffect(() => {
    getBrand(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteBrand(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "Brand",
      headerName: "Brand",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
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
            <Link to={"/brand/" + params.row._id}>
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
        <h1 className="productTitle">Brand List</h1>
        <Link to="/newBrand">
          <button className="productAddButton">Create</button>
      </Link>
      </div>
      <DataGrid
        rows={brands}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
