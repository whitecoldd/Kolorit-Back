import "../productList/productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContact } from "../../redux/apiCalls";

export default function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contact.contacts);

    useEffect(() => {
        getContact(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteContact(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "contact",
            headerName: "Contact",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "address",
            headerName: "Address",
            width: 250,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/contact/" + params.row._id}>
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
                <h1 className="productTitle">Contact List</h1>
                <Link to="/newcontact">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
                rows={contacts}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={12}
                checkboxSelection
            />
        </div>
    );
}
