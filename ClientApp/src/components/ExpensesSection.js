import React, {useEffect,useState} from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";   

const formStyle={
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    height:150
   
};
const gridContainerStyle ={
  display:"flex",
  flexDirection: "row",
  justifyContent: "space-evenly"  
};
const paperStyle = {
    padding:20,
    margin: 10,
   
};



export default function ExpensesSection () {
    
    useEffect( () => {
        
        
                 axios.get("https://localhost:5001/expenses")
                     .then( t=> setData(t.data));
                     

             
    });
    
    const handleSubmit = event => {
        event.preventDefault();
            
        let data = [{id:0,name:name,value:value}];
        
     
       
        axios.post("https://localhost:5001/expenses",  data )
            .then(res => {
                console.log(data);
                console.log(res);
                console.log(res.data);
            });
    };
    
    const handleNameChange = (e) =>{
        setName(e.target.value);
    };
    const handleValueChange = (e) =>{
        setValue(e.target.value);
    };
   
    
    const [data,setData] = useState([{id:0,name:"",value:0}]);
    const [name,setName] = useState("");
    const [value,setValue] = useState(0);
    
        
    const ee = data.map((e) => <li key={e.id}> {e.value} {e.name} </li> );
    
    return(
        <>
            <Grid container spacing={3} style={gridContainerStyle}>
                <Grid item>
                    <Paper style={paperStyle}>
                        <h5>Dodaj wydatek</h5>
                        <form  style={formStyle}>
                            <TextField variant="standard" label="Nazwa" value={name} onChange={handleNameChange}/>
                            <TextField variant="standard" label="Kwota" value={value} onChange={handleValueChange} />
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Dodaj wydatek</Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={paperStyle}>
                        <h5>Lista wydatkow</h5>
                        {ee}
                        
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}