import "../productList/productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubcategory, getSubcategory } from "../../redux/apiCalls";

export default function CategoryList() {
  const dispatch = useDispatch();
  const subcats = useSelector((state) => state.subcategory.subcategories);

  useEffect(() => {
    getSubcategory(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteSubcategory(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "cat", headerName: "categories", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/subcategory/" + params.row._id}>
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
        <h1 className="productTitle">Subcategory List</h1>
        <Link to="/newsubcategory">
          <button className="productAddButton">Create</button>
      </Link>
      </div>
      <DataGrid
        rows={subcats}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
