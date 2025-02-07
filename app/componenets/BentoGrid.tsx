import React from "react";
import Type1Bento from "./Type1Bento";

interface BentoGridProps {
  fullname: string;
  gitValues: object|null;
  allFeilds: object|null;
}

const BentoGrid:React.FC<BentoGridProps> = ({fullname, gitValues, allFeilds}) => {
  return (
    <div className="bg-[#1e1e2f] text-white p-8 min-h-screen w-full relative overflow-hidden">
      {/* Centering the Bento Component and making it responsive */}
      <div className="absolute inset-0 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[900px] sm:max-w-[100%] lg:max-w-[100%] xl:max-w-[100%] overflow-x-scroll scrollbar-hidden">
          <Type1Bento fullname = {fullname}  gitValues={gitValues} allFeilds={allFeilds} />
        </div>
      </div>

      {/* Right Sidebar (OK div) */}
      {/* <div className="text-white bg-pink-300 w-32 h-full absolute right-0 top-0 flex justify-center items-center rounded-l-lg sm:w-24 md:w-28 lg:w-32">
        <p className="text-lg">ok</p>
      </div> */}
    </div>
  );
};

// {
//   "user": {
//       "following": {
//           "totalCount": 17
//       },
//       "followers": {
//           "totalCount": 17
//       },
//       "gists": {
//           "totalCount": 0
//       },
//       "contributionsCollection": {
//           "totalCommitContributions": 258
//       },
//       "repositoriesContributedTo": {
//           "totalCount": 3
//       },
//       "pullRequests": {
//           "totalCount": 103
//       },
//       "issues": {
//           "totalCount": 111
//       },
//       "organizations": {
//           "totalCount": 0
//       },
//       "sponsoring": {
//           "totalCount": 0
//       },
//       "sponsors": {
//           "totalCount": 0
//       },
//       "createdAt": "2023-01-07T08:53:18Z",
//       "updatedAt": "2025-01-21T14:00:33Z",
//       "repositoriesWithStargazerCount": {
//           "totalCount": 11,
//           "nodes": [
//               {
//                   "stargazerCount": 1
//               },
//               {
//                   "stargazerCount": 1
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               },
//               {
//                   "stargazerCount": 0
//               }
//           ]
//       }
//   }
// }

export default BentoGrid;
