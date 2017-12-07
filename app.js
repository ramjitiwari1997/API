const express =require('express');
const app=express();
const NodeCache=require('node-cache');
const myCache=new NodeCache({stdTTL: 100,checkperiod:0,useClones:true});
var tabletojson=require('tabletojson');
function getData(){
    tabletojson.convertUrl('http://www.ipu.ac.in/sports.php',{stripHtmlFromCells:false,
    useFirstRowForHeadings: false }).then(success,fail);
    function success(doc){
        myCache.set("myKey",doc,function(err,success){
            if(!err&&success){
               console.log(obj);
            }
        });
    }
    function fail(err){
        console.log(err);
    }
}
setInterval(getData,10000);
app.get('/',function(req,res){
    res.setHeader('content-type','application/json');
myCache.get("myKey",function(err,data){
    if(err){
        res.send(err);
    }
    else{
        res.send(data[0]);
    }
})
});
app.listen(process.env.PORT||5000,function(){
    console.log("Express is running on port %d in %s mode",this.address().port,app.settings.env);
    });