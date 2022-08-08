import "../productList/productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubsubcategory, getSubsubcategory } from "../../redux/apiCalls";

export default function CategoryList() {
  const dispatch = useDispatch();
  const subsubcats = useSelector((state) => state.subsubcategory.subsubcategories);

  useEffect(() => {
    getSubsubcategory(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteSubsubcategory(id, dispatch);
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
    { field: "subcat", headerName: "Subcats", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/subsubcategory/" + params.row._id}>
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
        <h1 className="productTitle">Subsubcategory List</h1>
        <Link to="/newsubsubcategory">
          <button className="productAddButton">Create</button>
      </Link>
      </div>
      <DataGrid
        rows={subsubcats}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
