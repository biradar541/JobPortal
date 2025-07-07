import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 sm:p-5 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer transition hover:shadow-xl"
      onClick={() => navigate(`/description/${job?._id}`)}
    >
      {/* Job Title & Location */}
      <div className="mb-2">
        <h1 className="font-semibold text-base sm:text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>

      {/* Job Description */}
      <div className="mb-3">
        <h2 className="font-bold text-base sm:text-lg text-[#6A38C2] mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.experience}
        </Badge>
        <Badge className="text-[#F83002] font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
