export const calluser = async () => {
    let res= await fetch(`http://localhost:8000/api/user/getuser`,{
        method:'GET',
        headers:{
          'Access-Control-Allow-Origin': '*',
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:'include', 
      });
      let data=await res.json();
      if(res.status===200) return data;
      else return null;
  };