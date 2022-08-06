import "../productList/productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSlider, getSlider } from "../../redux/apiCalls";

export default function SliderList() {
  const dispatch = useDispatch();
  const sliders = useSelector((state) => state.slider.sliders);

  useEffect(() => {
    getSlider(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteSlider(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "slider",
      headerName: "Slide",
      width: 200,
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
      field: "text",
      headerName: "Content",
      width: 500,
    },
    {
      field: "lng",
      headerName: "Language",
      width: 50,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/slider/" + params.row._id}>
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
        <h1 className="productTitle">Slider List</h1>
        <Link to="/newslider">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={sliders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
