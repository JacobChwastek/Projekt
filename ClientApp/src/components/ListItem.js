import Button from "@material-ui/core/Button";
import React from "react";
import axios from "axios";

const liStyle = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    padding: 10
};

const handleDelete = async event => {


    console.log(event);
    axios.delete(`https://localhost:5001/expenses?Id=${event}`).catch(e => console.log(e));
    window.location.reload();
};

const ListItem = ({ item }) => {

    return (
        <li style={liStyle}>
            <div>{item.value}</div>
            <div>{item.name}</div>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(item.id)}> Delete</Button>
        </li>);
};

export default ListItem;