import React from "react";

const Sum= (data) =>
{
    let a =0;
    data.forEach(d => a+=d.value);
    return a;
    
    
};
export default Sum;