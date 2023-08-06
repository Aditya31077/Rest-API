const Product=require("../models/products");

const getAllProducts=async(req,res)=>{
    const {company,name,featured,sort,select}=req.query;
    const queryObject={};

    if(company){
        queryObject.company=company;
    }

    if(featured){
        queryObject.featured=featured;
    }

    if(name){
        queryObject.name={$regex:name,$options:"i"};
    }

    let apidata=Product.find(queryObject);

    if(sort){
        let sortFix=sort.replace(","," ");
        apidata=apidata.sort();
    }

    if(select){
        let selectFix=select.split(",").join(" ");
        apidata=apidata.select(selectFix);
    }

    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit)|| 4;

    let skip=(page-1)*limit;

    apidata=apidata.skip(skip).limit(limit);

    const Products=await apidata;
    res.status(200).json({Products,nbHits:myData.length});

};

const getAllProductsTesting=async(req,res)=>{
    const myData=await  Product.find(req.query).sort("-name");
    res.status(200).json({myData});

};


module.exports={getAllProducts,getAllProductsTesting}; 