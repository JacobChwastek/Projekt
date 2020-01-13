import React, {useEffect,useState} from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "./ListItem";
import Sum from "./Sum";
import  {formStyle,gridContainerStyle,paperStyle,displayMessageStyle,submitButtonStyle} from "./ExpensesStyle";

export default function ExpensesSection () {
    
    useEffect( (event) => {


            axios.get("https://localhost:5001/expenses").then( t=>setData(t.data));

    },[]);
  

    const handleSubmit = event => {
        event.preventDefault();
            
        const newName = name === "" ? `Wydatek` : name; 
        let data = {id:0,name:newName,value:parseFloat(value)};
        
        console.log({data});

        if (isValid)
        {
            axios.post("https://localhost:5001/expenses", data )
                .then(res => {

                    console.log(res);
                    console.log(res.data);
                })
                .catch(e=> console.log(e));
            window.location.reload();
        }
       
     
    };  
   
    
    const handleNameChange = (e) =>{
        setName(e.target.value);
    };
    const handleValueChange = (e) =>{
        if (isNaN(parseInt(e.target.value))){
            setValid(false);
        }
        else{
            setValid(true);
        }
      
        setValue((e.target.value));
    };

   
    
    const [data,setData] = useState([{id:0,name:"",value:0}]);
    const [name,setName] = useState("");
    const [value,setValue] = useState(0);
    const sum = Sum(data);
    const [isValid, setValid] = useState(true);


   
    const displayContent = 
        (data.map((e) =>
            
                <ListItem key={e.id} item={e}/>
                ));
    
    const displayMessage = () =>
        isValid === false ?
            (<>Podana wartość musi być liczbą! </>) : (<></>)
    ;
    return(
        <>
            <Grid container spacing={3} style={gridContainerStyle}>
                <Grid item>
                    <Paper style={paperStyle}>
                        <div className="Title">
                            <h5>Dodaj wydatek</h5>
                        </div>
                        <form  style={formStyle}>
                            <TextField variant="standard" label="Nazwa" value={name} onChange={handleNameChange}/>
                            <TextField  variant="standard" label="Kwota"  value={value} onChange={handleValueChange} />
                            <Button style={submitButtonStyle} type="submit" variant="contained" color="primary" onClick={handleSubmit}>Dodaj wydatek</Button>
                            <div  style={displayMessageStyle}>{displayMessage()}</div>
                        </form>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={paperStyle}>
                        <h5>Lista wydatkow</h5>
                  
                            {displayContent}
               
                        Suma : {sum}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}