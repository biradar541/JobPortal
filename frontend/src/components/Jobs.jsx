import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import {  useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        {/* Responsive Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-5">
          
          {/* Filter Sidebar */}
          <div className="w-full lg:w-[25%]">
            <FilterCard />
          </div>

          {/* Job Cards Section */}
          {!allJobs || allJobs.length === 0 ? (
            <span className="text-gray-500 mt-4">Job not found</span>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
