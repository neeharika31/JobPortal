import { Company} from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false,
            });
        }
        let company = await Company.findOne({name: companyName});
        if(company) {
            return res.status(400).json({
                message: "Company already exists with this name",
                success: false,
            });
        }
        company =await Company.create({
            name: companyName,
            userId: req.id,
        });
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
        
    }
}

export const getCompany = async (req, res) => {
    try {

        const userId = req.id; // logged in user id 
        const companies = await Company.find({recruiter: userId});
        if(!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Companies fetched successfully",
            companies,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
}

export const getCompanyById = async (req, res) => {
try {
    const companyId = req.params.id; // company id from params
    const company = await Company.findById(companyId);
    if(!company) {
        return res.status(404).json({
            message: "Company not found",
            success: false,
        });
    }   
    return res.status(200).json({
        message: "Company fetched successfully",
        company,
        success: true,
    });
} catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Something went wrong",
        success: false,
    });
    
}
}

export const updateCompany = async (req, res) => {
try {
    const { name,description, website, location } = req.body;
    const file = req.file; // file from multer
    // cloudinary 

    const companyId = req.params.id; // company id from params
    const updateData = {
        name,
        description,
        website,
        location,
    };
    const company = await Company.findByIdAndUpdate(companyId, updateData, {new: true});
    if(!company) {
        return res.status(404).json({
            message: "Company not found",
            success: false,
        });
    }
    return res.status(200).json({
        message: "Company updated successfully",
        company,
        success: true,
    });

} catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Something went wrong",
        success: false,
    });
    
}
}
