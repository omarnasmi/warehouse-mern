const Garage= require("../models/garageModel");

const getAllGarages= async(req,res)=>{
    try{
        const garage = await Garage.find({})
        res.status(200).json({garages})
    }
    catch(error)
    {
        res.status(500).json({error:'failed to fetch Garages'})
    }

}

const getGarageById = async(req,res)=>{
    const {id}= req.params;
    try{
        const garage= await Garage.findById(id);
        if(!garage)
            return res.status(404).json({error:"Garage Not Found"})
        res.status(200).json({garage});
        
    }
    catch(error)
    {
        res.status(500).json({error:"failed to fetch Garage"})
    }

}

const createGarage = async (req,res)=>{
    const {id} = req.params;
    const {num,name,capacity}=req.body;

    try{
        const garage = await Garage.create({num,name,capacity});
  
        res.status(200).json({message:"Garage created successfully"});

    }
    catch(error)
    {
        res.status(500).json({error:"Error Updating the garage"});
    }
}

const deleteGarage = async (req,res)=>{
    const {id}= req.params;
    try{
        const garage = await Garage.findByIdAndDelete(id)
        if(!garage)
            return res.status(404).json({error:"Garage Not Found"})
        res.status(200).json({msg:"garage deleted successfully"});
        
    }
    catch(error)
    {
        res.status(500).json({error:"failed to fetch Garage"})
    }
    

}

const updateGarage = async (req,res)=>{
    const {id} = req.params;
    const {num,name,capacity}=req.body;

    try{
        const garage = await Garage.findByIdAndUpdate(id,{num,name,capacity},{new:true});
        if(!garage)
            return res.status(404).json({error:"garage not found"});
        res.status(200).json({message:"Garage Updated successfully"});

    }
    catch(error)
    {
        res.status(500).json({error:"Error Updating the garage"});
    }
}


module.exports={getAllGarages,getGarageById,createGarage,deleteGarage,updateGarage}