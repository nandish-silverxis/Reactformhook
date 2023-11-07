



// export const updateData = ()=>{ 
    
   

	 
// 	return async (dispatch,getState)=>{ 

		
// 		const response = await fetch( 'https://kriyan-node-demo.onrender.com/api/v1/edit-user',
//         {
//             method: "PATCH",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify()
//         }); 
// 		const data = await response.json(); 

		
// 		dispatch({ 
// 			type : 'UPDATE_DATA', 
// 			payload : data 
// 		});
         
// 	} 
// } 

export const getData = ()=>{ 
    
   

	 
	return async (dispatch,getState)=>{ 

		console.log(".......")
		let res =await fetch("https://kriyan-node-demo.onrender.com/api/v1/login",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify()
      })
  
     const data = await res.json(); 

		
		dispatch({ 
			type : 'UPDATE_DATA', 
			payload : data 
		}); 

        
	} 
} 


