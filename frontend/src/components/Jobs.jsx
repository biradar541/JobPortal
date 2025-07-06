import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]"> 
            <FilterCard />
          </div>
          {!allJobs || allJobs.length === 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <Job key={job._id} job={job} /> 
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
