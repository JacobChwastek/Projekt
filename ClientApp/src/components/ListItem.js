import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import axios from "axios";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";



const liStyle = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    padding: 10
};

const nameStyle = {
  
    overflow:"auto",
    maxWidth:"50%",
    
};

const handleDelete = async event => {

    
    console.log(event);
    axios.delete(`https://localhost:5001/expenses?Id=${event}`).catch(e => console.log(e));
    window.location.reload();
};



const ListItem = ({ item }) => {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
       
       <div>
           <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
           >
               <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
               <DialogContent>
                   <DialogContentText id="alert-dialog-description">
                       Jesteś pewny, żę chcesz usunąć {item.name} koszt: {item.value}
                   </DialogContentText>
               </DialogContent>
               <DialogActions>
                   <Button onClick={() => {handleDelete(item.id); handleClose();}} color="primary">
                       Tak
                   </Button>
                   <Button onClick={handleClose} color="primary" autoFocus>
                       Nie
                   </Button>
               </DialogActions>
           </Dialog>
           
           
           <li style={liStyle}>
               <div >{item.value} </div>
               <div style={nameStyle}>{item.name}</div>
               <Button variant="outlined" color="secondary" onClick={handleClickOpen} > Delete</Button>
           </li>
           
       </div>
       
       
    );
        
};

export default ListItem;
