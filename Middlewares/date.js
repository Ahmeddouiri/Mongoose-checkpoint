const dateCondition = (req,res,next)=>{

const date = new Date()
const hours = date.getHours()
console.log(hours);
if(hours>9 && hours<19)
{
    next()

}
else {
    return res.status(403).send("arja3 ghodwa sa7bi 🤩")
}


}
module.exports = dateCondition;