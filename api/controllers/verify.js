const verify=(req,res)=>
{
    try {
        console.log("verify");
       return res.json({message:true})
    
    } catch (error) {
        console.error(error);
    }
}
export default verify;


