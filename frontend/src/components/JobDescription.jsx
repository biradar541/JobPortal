import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Top Section */}
      <Navbar />
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-lg sm:text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-bold text-sm" variant="ghost">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold text-sm" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold text-sm" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-sm sm:text-base ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Description Section */}
      <h2 className="border-b-2 border-b-gray-300 font-medium py-4 text-lg mt-6">
        Job Description
      </h2>
      <div className="my-4 space-y-2 text-sm sm:text-base text-gray-800">
        <p>
          <strong>Role:</strong>{" "}
          <span className="pl-4">{singleJob?.title}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span className="pl-4">{singleJob?.location}</span>
        </p>
        <p>
          <strong>Description:</strong>{" "}
          <span className="pl-4">{singleJob?.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="pl-4">{singleJob?.experience} yrs</span>
        </p>
        <p>
          <strong>Salary:</strong>{" "}
          <span className="pl-4">{singleJob?.salary} LPA</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{" "}
          <span className="pl-4">{singleJob?.applications?.length}</span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          <span className="pl-4">{singleJob?.createdAt?.split("T")[0]}</span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
