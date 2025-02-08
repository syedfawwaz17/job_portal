import Company from "../models/company.model.js";


export const registerCompany = async (req, res) => {
    try {
        console.log("✅ req.id received in registerCompany:", req.id); // Debug log

        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

       
        if (!req.id) {
            return res.status(401).json({
                message: "User authentication failed, please log in again.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,  
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log("Error in registerCompany:", error);
        res.status(500).json({
            message: "Server error while registering company",
            success: false
        });
    }
};

export const getCompany = async (req,res)=>{
    try{
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}


export const getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        if(!companyId){
            return res.status(404).json({
                message:"Company not found",
                success: false
            }) 
        } 
        const company = await Company.findById(companyId);
        return res.status(200).json({
            company,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}

export const updateCompany = async (req,res)=>{
    try{
        const {name,description,website,location} = req.body
        const updatedData = {name,description,website,location};
        const company = await Company.findByIdAndUpdate(req.params.id,updatedData,{new:true});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success: false
            }) 
        }
        return res.status(200).json({
            message:"Company data updated",
            success:true
        })
    }catch(error){
        console.log(error)
    }
}
