import {Job} from "../models/job.model.js"
import Fuse from "fuse.js";
// Admin side controller
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
        
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experienceLevel, // fixed
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const GetJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

export const GetAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // Step 1: Get all jobs (you can filter this if needed for performance)
    const allJobs = await Job.find()
      .populate("company")
      .sort({ createdAt: -1 });

    // Step 2: If keyword exists, use Fuse.js to perform fuzzy search
    if (keyword.trim() !== "") {
      const fuse = new Fuse(allJobs, {
        keys: ["title", "description", "location", "jobType","Salary"], // searchable fields
        threshold: 0.3, // lower = stricter, higher = fuzzier (0.3 is good balance)
      });

      const fuzzyResults = fuse.search(keyword);
      const matchedJobs = fuzzyResults.map((result) => result.item);

      if (matchedJobs.length === 0) {
        return res.status(404).json({
          message: "No jobs matched your search.",
          success: false,
        });
      }

      return res.status(200).json({
        jobs: matchedJobs,
        success: true,
      });
    }

    // Step 3: If no keyword, return all jobs normally
    return res.status(200).json({
      jobs: allJobs,
      success: true,
    });
  } catch (error) {
    console.error("GetAllJobs Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
