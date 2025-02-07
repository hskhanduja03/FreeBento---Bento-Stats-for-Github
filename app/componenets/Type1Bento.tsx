import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface type1Props {
  fullname: string;
  gitValues: object | null;
  allFeilds: object | null;
}
// "\n    query languageStats($username: String!) {\n  matchedUser(username: $username) {\n    languageProblemCount {\n      languageName\n      problemsSolved\n    }\n  }\n}\n    "
// contest
// "\n    query userContestRankingInfo($username: String!) {\n  userContestRanking(username: $username) {\n    attendedContestsCount\n    rating\n    globalRanking\n    totalParticipants\n    topPercentage\n    badge {\n      name\n    }\n  }\n  userContestRankingHistory(username: $username) {\n    attended\n    trendDirection\n    problemsSolved\n    totalProblems\n    finishTimeInSeconds\n    rating\n    ranking\n    contest {\n      title\n      startTime\n    }\n  }\n}\n    "
// https://leetcode.com/u/hskhanduja15/

const Type1Bento: React.FC<type1Props> = ({
  fullname,
  gitValues,
  allFeilds,
}) => {
  const initialState = {
    following: {
      totalCount: 0,
    },
    followers: {
      totalCount: 0,
    },
    gists: {
      totalCount: 0,
    },
    contributionsCollection: {
      totalCommitContributions: 0,
    },
    repositoriesContributedTo: {
      totalCount: 0,
    },
    pullRequests: {
      totalCount: 0,
    },
    issues: {
      totalCount: 0,
    },
    organizations: {
      totalCount: 0,
    },
    sponsoring: {
      totalCount: 0,
    },
    sponsors: {
      totalCount: 0,
    },
    createdAt: "2023-01-07T08:53:18Z",
    updatedAt: "2025-01-21T14:00:33Z",
    repositoriesWithStargazerCount: {
      totalCount: 0,
      nodes: [],
    },
  };

  // State that will hold the Git values
  const [state, setState] = useState(initialState);
  const [numQues, setnumQues] = useState(0);
  const [centreImage, setcentreImage] = useState("/assets/image.png");

  useEffect(() => {
    if (gitValues?.user || allFeilds?.codingProfiles?.github?.user) {
      setState((prev) => ({
        following:
          gitValues?.user?.following ??
          allFeilds?.codingProfiles?.github?.user?.following ??
          prev.following,
        followers:
          gitValues?.user?.followers ??
          allFeilds?.codingProfiles?.github?.user?.followers ??
          prev.followers,
        gists:
          gitValues?.user?.gists ??
          allFeilds?.codingProfiles?.github?.user?.gists ??
          prev.gists,
        contributionsCollection:
          gitValues?.user?.contributionsCollection ??
          allFeilds?.codingProfiles?.github?.user?.contributionsCollection ??
          prev.contributionsCollection,
        repositoriesContributedTo:
          gitValues?.user?.repositoriesContributedTo ??
          allFeilds?.codingProfiles?.github?.user?.repositoriesContributedTo ??
          prev.repositoriesContributedTo,
        pullRequests:
          gitValues?.user?.pullRequests ??
          allFeilds?.codingProfiles?.github?.user?.pullRequests ??
          prev.pullRequests,
        issues:
          gitValues?.user?.issues ??
          allFeilds?.codingProfiles?.github?.user?.issues ??
          prev.issues,
        organizations:
          gitValues?.user?.organizations ??
          allFeilds?.codingProfiles?.github?.user?.organizations ??
          prev.organizations,
        sponsoring:
          gitValues?.user?.sponsoring ??
          allFeilds?.codingProfiles?.github?.user?.sponsoring ??
          prev.sponsoring,
        sponsors:
          gitValues?.user?.sponsors ??
          allFeilds?.codingProfiles?.github?.user?.sponsors ??
          prev.sponsors,
        createdAt:
          gitValues?.user?.createdAt ??
          allFeilds?.codingProfiles?.github?.user?.createdAt ??
          prev.createdAt,
        updatedAt:
          gitValues?.user?.updatedAt ??
          allFeilds?.codingProfiles?.github?.user?.updatedAt ??
          prev.updatedAt,
        repositoriesWithStargazerCount:
          gitValues?.user?.repositoriesWithStargazerCount ??
          allFeilds?.codingProfiles?.github?.user
            ?.repositoriesWithStargazerCount ??
          prev.repositoriesWithStargazerCount,
      }));
    }
    if (allFeilds?.profileImage) {
      setcentreImage(allFeilds.profileImage);
    }
    setnumQues(
      (parseInt(allFeilds?.codingProfiles?.codeforces?.numQuestions) || 0) +
        (parseInt(allFeilds?.codingProfiles?.leetcode?.totalProblemsSolved) ||
          0) +
        (parseInt(allFeilds?.codingProfiles?.codechef?.totalProblemsSolved) ||
          0) +
        (parseInt(allFeilds?.codingProfiles?.gfg?.totalSolved) || 0) +
        (parseInt(allFeilds?.codingProfiles?.coding_ninjas?.totalProblems) || 0)
    );
  }, [JSON.stringify(gitValues), JSON.stringify(allFeilds)]);

  console.log(allFeilds);
  console.log(centreImage);

  const totalStars = state.repositoriesWithStargazerCount.nodes.reduce(
    (acc, node) => acc + node.stargazerCount,
    0
  );

  return (
    <div className="flex-col flex select-none">
      <div className="w-full max-w-[900px] aspect-[3/2.2] bg-black rounded-lg mx-auto p-4 relative flex flex-col">
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 h-full flex-grow">
          {/* Left Column */}
          <div>
            <div className="grid grid-rows-[2.41fr_1.34fr_1fr] gap-5 h-full">
              <div className="custom-gradient w-full rounded-2xl p-4 flex flex-col gap-4 sm:gap-2 shine-div">
                <span className="purple-text text-4xl sm:text-3xl md:text-4xl lg:text-5xl">
                  {numQues}
                  {numQues ? "+" : ""}
                </span>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#AA9CFC] text-lg sm:text-xl  md:text-2xl lg:text-3xl leading-8">
                  <div>Questions</div>
                  <div>Solved</div>
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#AA9CFC] text-sm sm:text-xs md:text-sm lg:text-md h-full flex gap-2 sm:gap-1 flex-col justify-end">
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="code-forces"
                        className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6"
                      >
                        <path
                          fill="#F44336"
                          d="M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z"
                        ></path>
                        <path
                          fill="#2196F3"
                          d="M13.5 21a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5h3z"
                        ></path>
                        <path
                          fill="#FFC107"
                          d="M0 19.5c0 .828.673 1.5 1.5 1.5h3A1.5 1.5 0 0 0 6 19.5V9a1.5 1.5 0 0 0-1.5-1.5h-3C.673 7.5 0 8.172 0 9v10.5z"
                        ></path>
                      </svg>
                      Codeforces
                    </span>
                    <span className="text-sm sm:text-xs md:text-sm lg:text-md">
                      {allFeilds?.codingProfiles?.codeforces?.numQuestions ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="leetcode"
                        className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6"
                      >
                        <path
                          fill="#B3B1B0"
                          d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"
                        ></path>
                        <path
                          fill="#E7A41F"
                          d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"
                        ></path>
                        <path
                          fill="#070706"
                          d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"
                        ></path>
                      </svg>
                      Leetcode
                    </span>
                    <span className="text-sm sm:text-xs md:text-sm lg:text-md">
                      {allFeilds?.codingProfiles?.leetcode
                        ?.totalProblemsSolved ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <Image
                        src={"/assets/cninjas.png"}
                        width={20}
                        height={20}
                        alt="codechef-icon"
                      />
                      Coding Ninjas
                    </span>
                    <span className="text-sm sm:text-xs md:text-sm lg:text-md">
                      {allFeilds?.codingProfiles?.coding_ninjas
                        ?.totalProblems ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <Image
                        src={"/assets/codecheff.png"}
                        width={20}
                        height={20}
                        alt="codechef-icon"
                      />
                      Codechef
                    </span>
                    <span className="text-sm sm:text-xs md:text-sm lg:text-md">
                      {allFeilds?.codingProfiles?.codechef
                        ?.totalProblemsSolved ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <Image
                        src={"/assets/gfg.png"}
                        width={20}
                        height={20}
                        alt="gfg-icon"
                      />
                      GfG
                    </span>
                    <span className="text-sm sm:text-xs md:text-sm lg:text-md">
                      {allFeilds?.codingProfiles?.gfg?.totalSolved ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="custom-gradient-lb w-full rounded-2xl p-4">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc891] to-[#e46b64] text-3xl md:text-5xl text-center">
                  {state.contributionsCollection.totalCommitContributions}
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#AA9CFC] text-sm md:text-md tracking-wider leading-5 text-center">
                  <p>Commits</p>
                </div>
                <div className="relative flex justify-center mt-4 ml-[45%] -translate-x-1/2">
                  {/* First Circle with Background Image */}
                  <div
                    className="absolute left-0 border-2 border-black rounded-full bg-[#E48C5D] h-8 w-8 md:h-12 md:w-12"
                    style={{
                      backgroundImage: "url('/assets/pull-shark.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  {/* Middle Circle */}
                  {/* <div className="absolute left-6 md:left-8 border-[3.5px] border-[#26222a] rounded-full bg-gradient-to-r from-white to-[#f4a87f] h-8 w-8 md:h-12 md:w-12">
                    <Image
                      src={"/assets/Star.png"}
                      width={44}
                      height={44}
                      alt="star"
                      className="mt-2 font-bold"
                    />
                  </div> */}
                  <div
                    className="absolute left-6 md:left-8 border-2 border-black rounded-full bg-[#8A6CEA] h-8 w-8 md:h-12 md:w-12"
                    style={{
                      backgroundImage: "url('/assets/pull-shark3.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  {/* Last Circle with Background Image */}
                  <div
                    className="absolute left-12 md:left-16 border-2 border-black rounded-full bg-[#8A6CEA] h-8 w-8 md:h-12 md:w-12"
                    style={{
                      backgroundImage: "url('/assets/pull-shark2.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
              <div className="custom-gradient-lb w-full rounded-2xl p-4 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute w-[50%] h-[90%] opacity-20  -left-2  -bottom-3">
                  <Image
                    src="/assets/pull-new.png"
                    alt="pull-new"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-125 drop-shadow-[0px_0px_30px_rgba(139,120,246,1.5)]"
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc891] to-[#e46b64] text-3xl md:text-5xl flex items-center justify-center gap-4">
                    <span>{state.pullRequests.totalCount}</span>
                  </h1>
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#AA9CFC] text-sm md:text-md tracking-wider">
                    <p>Pull Requests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="grid grid-rows-[1fr_1.04fr] gap-5 h-full">
            <div className="centre-up-gradient w-full rounded-2xl p-4">
              <div className="flex items-center justify-center text-center gap-2">
                <div
                  className="h-6 w-8 md:h-5 md:w-6 lg:h-6 lg:w-8"
                  style={{
                    backgroundImage: "url('/assets/logo.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <p className="text-sm md:text-lg lg:text-xl">FreeBento</p>
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center mt-4 flex flex-col items-center justify-center gap-3">
                <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                  {fullname.trim() + "'s"}
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white to-[#AA9CFC] font-bold">
                  Statistics
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
              {/* Left Card */}
              <div className="custom-gradient-ml w-full rounded-2xl relative p-3 sm:p-5 overflow-hidden">
                {/* <div className="w-[120%] h-[120%] absolute z-0 right-4 top-28 opacity-30">
                  <Image
                    src="/assets/github.png"
                    alt="Bento Image"
                    layout="responsive"
                    width={100}
                    height={100}
                    className="object-cover brightness-125 drop-shadow-[0px_0px_30px_rgba(139,120,246,1.5)]"
                  />
                </div> */}
                {/* Background Effect */}
                <div
                  className="h-20 sm:h-28 w-16 sm:w-20 absolute top-0 -left-1"
                  style={{
                    backgroundImage: "url('/assets/effect-left.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#9283eb] text-xl z-50 opacity-50 font-bold">
              {allFeilds?.codingProfiles?.github?.username}
              </div> */}
                {/* Content */}
                <div className="flex flex-col gap-1 absolute bottom-3">
                  {/* Icon */}
                  <div className="rounded-full h-8 w-8 sm:h-10 sm:w-10 custom-gradient-circle flex items-center justify-center p-1 font-bold">
                    <Image
                      src={"/assets/commit-git.png"}
                      width={20}
                      height={20}
                      alt="calendar"
                    />
                  </div>

                  {/* Stats */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8b78f6] mt-3">
                    {state.organizations.totalCount}
                  </h1>
                  <h2 className="text-sm sm:text-md text-[#E6E3FF] leading-3 tracking-wide">
                    Repos' Contributed
                  </h2>
                </div>
              </div>

              {/* Right Card */}
              <div className="custom-gradient-ml w-full rounded-2xl relative p-3 sm:p-5 overflow-hidden shine-div">
                <div
                  className="h-20 sm:h-28 w-16 sm:w-20 absolute top-0 -right-1"
                  style={{
                    backgroundImage: "url('/assets/effect-right.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="w-[130%] h-[100%] absolute z-0 opacity-30 left-4 -bottom-28">
                  <Image
                    src="/assets/fire1.png"
                    alt="Bento Image"
                    layout="responsive"
                    width={100}
                    height={100}
                    className="object-cover brightness-125 drop-shadow-[0px_0px_30px_rgba(139,120,246,1.5)]"
                  />
                </div>

                <div className="flex flex-col gap-1 absolute bottom-3 right-3 justify-end items-end">
                  {/* Icon */}
                  <div className=" z-20 rounded-full h-8 w-8 sm:h-10 sm:w-10 custom-gradient-circle flex items-center justify-center p-1 font-bold">
                    <Image
                      src={"/assets/calendar.png"}
                      width={24}
                      height={24}
                      alt="calendar"
                    />
                  </div>

                  {/* Stats */}
                  <h1 className="z-20 text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8b78f6] mt-3">
                    400
                  </h1>
                  <h2 className="z-20  text-sm sm:text-md text-[#E6E3FF] leading-3 tracking-wide">
                    Streak
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Image */}
          <div className="glow-image-container rounded-full h-[20vw] w-[20vw]  overflow-hidden object-center max-h-[41%] max-w-[30%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[3vw] md:border-[1.3rem] border-black">
            <Image
              src={centreImage}
              alt="Bento Image"
              layout="responsive"
              width={100}
              height={100}
              className="rounded-full object-cover "
            />
          </div>

          {/* Right Column */}
          <div>
            <div className="grid grid-rows-[1fr_1.34fr_2.62fr] gap-5 h-full">
              <div className="shine-div custom-gradient-ru relative w-full rounded-2xl flex flex-col items-center justify-center overflow-hidden ">
                <div className="w-[80%] h-[80%] absolute z-0 opacity-30 -right-6 -top-3 ">
                  <Image
                    src="/assets/star1.png"
                    alt="Bento Image"
                    layout="responsive"
                    width={100}
                    height={100}
                    className="object-cover brightness-125 drop-shadow-[0px_0px_30px_rgba(139,120,246,1.5)] "
                  />
                </div>
                <div className="relative h-16 w-28 bg-[#1A1C37] rounded-full p-1 flex items-center justify-between">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#FFDAA3] via-[#E27F5A] to-[#691616] flex items-center justify-center">
                    <Image
                      src={"/assets/shines.png"}
                      height={20}
                      width={20}
                      alt="shine"
                    />
                  </div>
                  <p className="text-[#ccc3ff] text-2xl text-center p-2">
                    {totalStars}
                  </p>
                </div>
                <p className="text-[#f1efff] tracking-wide text-md">Stars</p>
              </div>

              <div className="custom-gradient-ru w-full rounded-2xl relative overflow-hidden  flex justify-center items-center">
                <div className="w-[100%] h-[100%] absolute opacity-30 -right-1/4  z-0">
                  <Image
                    src="/assets/group-chat.png"
                    alt="Bento Image"
                    layout="responsive"
                    width={100}
                    height={100}
                    className="object-cover brightness-100 drop-shadow-[0px_0px_30px_rgba(255,218,163,1)]" // Updated shadow color
                  />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="z-20 flex flex-col items-center justify-center gap-2 border-l-4 border-r-4 px-8 py-1 bg-[#2728467f] border-[#ffc891]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc891] to-[#e46b64] text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                      {state.followers.totalCount}
                    </span>
                  </div>
                  <div className="text-md sm:text-md text-[#E6E3FF] leading-3 tracking-wide block">
                    Followers
                  </div>
                </div>
              </div>
              <div className="custom-gradient-rb w-full rounded-2xl p-4 flex flex-col gap-4 sm:gap-2">
                {/* <span className="purple-text text-4xl sm:text-3xl md:text-4xl lg:text-5xl">
                  400
                </span> */}
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#AA9CFC] text-lg sm:text-xl  md:text-2xl lg:text-3xl leading-8">
                  <div>Socials &</div>
                  <div>Ratings</div>
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#AA9CFC] text-sm sm:text-xs md:text-sm lg:text-md h-full flex gap-2 sm:gap-1 flex-col justify-end">
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                        className="h-8 w-8 sm:h-5 sm:w-5 md:h-6 md:w-6"
                      >
                        <path
                          fill="#0078d4"
                          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                        ></path>
                        <path
                          d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                          opacity=".05"
                        ></path>
                        <path
                          d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                          opacity=".07"
                        ></path>
                        <path
                          fill="#fff"
                          d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                        ></path>
                      </svg>
                      Linkedin
                    </span>
                    <span
                      className={`text-sm sm:text-xs md:text-sm lg:text-md hover:underline`}
                    >
                      {allFeilds?.social?.linkedin}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 48 48"
                        className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6"
                      >
                        <radialGradient
                          id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                          cx="19.38"
                          cy="42.035"
                          r="44.899"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#fd5"></stop>
                          <stop offset=".328" stop-color="#ff543f"></stop>
                          <stop offset=".348" stop-color="#fc5245"></stop>
                          <stop offset=".504" stop-color="#e64771"></stop>
                          <stop offset=".643" stop-color="#d53e91"></stop>
                          <stop offset=".761" stop-color="#cc39a4"></stop>
                          <stop offset=".841" stop-color="#c837ab"></stop>
                        </radialGradient>
                        <path
                          fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                          d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                        ></path>
                        <radialGradient
                          id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                          cx="11.786"
                          cy="5.54"
                          r="29.813"
                          gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#4168c9"></stop>
                          <stop
                            offset=".999"
                            stop-color="#4168c9"
                            stop-opacity="0"
                          ></stop>
                        </radialGradient>
                        <path
                          fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                          d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                        ></path>
                        <circle
                          cx="31.5"
                          cy="16.5"
                          r="1.5"
                          fill="#fff"
                        ></circle>
                        <path
                          fill="#fff"
                          d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                        ></path>
                      </svg>
                      Instagram
                    </span>
                    <span
                      className={`text-sm sm:text-xs md:text-sm lg:text-md hover:underline`}
                    >
                      {allFeilds?.social?.instagram}
                    </span>
                  </div>
                  {/* {allFeilds?.social?.linktree && ( */}

                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision"
                        image-rendering="optimizeQuality"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        viewBox="0 0 417 512.238"
                        className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6"
                      >
                        <path
                          fill="#43E660"
                          fill-rule="nonzero"
                          d="M171.274 344.942h74.09v167.296h-74.09V344.942zM0 173.468h126.068l-89.622-85.44 49.591-50.985 85.439 87.829V0h74.086v124.872L331 37.243l49.552 50.785-89.58 85.24H417v70.502H290.252l90.183 87.629L331 381.192 208.519 258.11 86.037 381.192l-49.591-49.591 90.218-87.631H0v-70.502z"
                        />
                      </svg>
                      Linker tree
                    </span>
                    <span
                      className={`text-sm sm:text-xs md:text-sm lg:text-md hover:underline`}
                    >
                      {allFeilds?.social?.linktree}
                    </span>
                  </div>
                  {/* )} */}
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#ffffff"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.75732 6.22215L11.9865 10.0365L17.3285 6.09078C18.1446 5.44632 19.191 5.33494 20.046 5.76509C20.9153 6.20242 21.5 7.1513 21.5 8.44705V16.7618C21.5 17.2333 21.4407 17.9088 21.0814 18.4781C20.6956 19.0893 20.019 19.4943 18.9793 19.4943H16.889C16.6129 19.4943 16.389 19.2704 16.389 18.9943V13.2008L12.2867 16.2518C12.1093 16.3838 11.8662 16.3835 11.689 16.2511L7.61098 13.2036V16.7186C7.61098 16.9947 7.38713 17.2186 7.11098 17.2186C6.83484 17.2186 6.61098 16.9947 6.61098 16.7186V12.2058C6.61098 12.0165 6.71781 11.8435 6.88699 11.7588C7.05617 11.674 7.25871 11.692 7.41029 11.8053L11.9891 15.2269L16.5906 11.8046C16.7423 11.6918 16.9446 11.6741 17.1135 11.759C17.2824 11.8439 17.389 12.0168 17.389 12.2058V18.4943H18.9793C19.7234 18.4943 20.0572 18.2272 20.2358 17.9443C20.4408 17.6194 20.5 17.1787 20.5 16.7618V8.44705C20.5 7.46479 20.0744 6.89879 19.5966 6.65841C19.1071 6.41213 18.4732 6.45826 17.9434 6.87938C17.9388 6.88305 17.9341 6.88664 17.9294 6.89014L12.2854 11.0589C12.1097 11.1887 11.8701 11.1894 11.6937 11.0607L6.16182 7.02554C5.66596 6.65592 4.93253 6.43285 4.36979 6.51816C4.10149 6.55884 3.89833 6.66433 3.75932 6.82883C3.62023 6.99343 3.5 7.27084 3.5 7.74087V17.1491C3.5 17.8103 3.73627 18.1246 3.96224 18.2868C4.21573 18.4688 4.53566 18.5148 4.74399 18.4962C4.75875 18.4949 4.77357 18.4943 4.78839 18.4943H6.11098C6.38713 18.4943 6.61098 18.7181 6.61098 18.9943C6.61098 19.2704 6.38713 19.4943 6.11098 19.4943H4.80887C4.42163 19.5237 3.86072 19.445 3.37906 19.0992C2.85986 18.7264 2.5 18.0915 2.5 17.1491V7.74087C2.5 7.09846 2.66719 6.57192 2.99552 6.18339C3.32393 5.79476 3.7682 5.59794 4.2199 5.52946C5.09621 5.39661 6.09189 5.72702 6.75732 6.22215Z"
                            fill="#ffffff"
                          ></path>{" "}
                        </g>
                      </svg>
                      Mail
                    </span>
                    <span
                      className={`text-sm sm:text-xs md:text-sm lg:text-md hover:underline`}
                    >
                      {allFeilds?.email}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        viewBox="0 -4 48 48"
                        version="1.1"
                        className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>Twitter-color</title>{" "}
                          <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                          <g
                            id="Icons"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            {" "}
                            <g
                              id="Color-"
                              transform="translate(-300.000000, -164.000000)"
                              fill="#00AAEC"
                            >
                              {" "}
                              <path
                                d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283"
                                id="Twitter"
                              >
                                {" "}
                              </path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      Twitter
                    </span>
                    <span
                      className={`text-sm sm:text-xs md:text-sm lg:text-md hover:underline`}
                    >
                      {allFeilds?.social?.twitter}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-xs md:text-sm lg:text-base items-center">
                    <span className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 64 64"
                        className="h-7 w-7 sm:h-5 sm:w-5 md:h-7 md:w-7"
                      >
                        <linearGradient
                          id="KpzH_ttTMIjq8dhx1zD2pa_52539_gr1"
                          x1="30.999"
                          x2="30.999"
                          y1="16"
                          y2="55.342"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#6dc7ff"></stop>
                          <stop offset="1" stop-color="#e6abff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#KpzH_ttTMIjq8dhx1zD2pa_52539_gr1)"
                          d="M25.008,56.007c-0.003-0.368-0.006-1.962-0.009-3.454l-0.003-1.55 c-6.729,0.915-8.358-3.78-8.376-3.83c-0.934-2.368-2.211-3.045-2.266-3.073l-0.124-0.072c-0.463-0.316-1.691-1.157-1.342-2.263 c0.315-0.997,1.536-1.1,2.091-1.082c3.074,0.215,4.63,2.978,4.694,3.095c1.569,2.689,3.964,2.411,5.509,1.844 c0.144-0.688,0.367-1.32,0.659-1.878C20.885,42.865,15.27,40.229,15.27,30.64c0-2.633,0.82-4.96,2.441-6.929 c-0.362-1.206-0.774-3.666,0.446-6.765l0.174-0.442l0.452-0.144c0.416-0.137,2.688-0.624,7.359,2.433 c1.928-0.494,3.969-0.749,6.074-0.759c2.115,0.01,4.158,0.265,6.09,0.759c4.667-3.058,6.934-2.565,7.351-2.433l0.451,0.145 l0.174,0.44c1.225,3.098,0.813,5.559,0.451,6.766c1.618,1.963,2.438,4.291,2.438,6.929c0,9.591-5.621,12.219-10.588,13.087 c0.563,1.065,0.868,2.402,0.868,3.878c0,1.683-0.007,7.204-0.015,8.402l-2-0.014c0.008-1.196,0.015-6.708,0.015-8.389 c0-2.442-0.943-3.522-1.35-3.874l-1.73-1.497l2.274-0.253c5.205-0.578,10.525-2.379,10.525-11.341c0-2.33-0.777-4.361-2.31-6.036 l-0.43-0.469l0.242-0.587c0.166-0.401,0.894-2.442-0.043-5.291c-0.758,0.045-2.568,0.402-5.584,2.447l-0.384,0.259l-0.445-0.123 c-1.863-0.518-3.938-0.796-6.001-0.806c-2.052,0.01-4.124,0.288-5.984,0.806l-0.445,0.123l-0.383-0.259 c-3.019-2.044-4.833-2.404-5.594-2.449c-0.935,2.851-0.206,4.892-0.04,5.293l0.242,0.587l-0.429,0.469 c-1.536,1.681-2.314,3.712-2.314,6.036c0,8.958,5.31,10.77,10.504,11.361l2.252,0.256l-1.708,1.49 c-0.372,0.325-1.03,1.112-1.254,2.727l-0.075,0.549l-0.506,0.227c-1.321,0.592-5.839,2.162-8.548-2.485 c-0.015-0.025-0.544-0.945-1.502-1.557c0.646,0.639,1.433,1.673,2.068,3.287c0.066,0.19,1.357,3.622,7.28,2.339l1.206-0.262 l0.012,3.978c0.003,1.487,0.006,3.076,0.009,3.444L25.008,56.007z"
                        ></path>
                        <linearGradient
                          id="KpzH_ttTMIjq8dhx1zD2pb_52539_gr2"
                          x1="32"
                          x2="32"
                          y1="5"
                          y2="59.167"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stop-color="#1a6dff"></stop>
                          <stop offset="1" stop-color="#c822ff"></stop>
                        </linearGradient>
                        <path
                          fill="url(#KpzH_ttTMIjq8dhx1zD2pb_52539_gr2)"
                          d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"
                        ></path>
                      </svg>
                      Github
                    </span>
                    <span
                      className={`text-sm sm:text-xs md:text-sm lg:text-md hover:underline`}
                    >
                      {allFeilds?.codingProfiles?.github?.username}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pink Div spanning all columns, same color, padding, and roundness */}
        {/* <div className="w-full h-24 bg-gray-700 p-4 rounded-lg mt-4">
          <p className="text-center text-white">Pink Div Content</p>
        </div> */}
      </div>
    </div>
  );
};

export default Type1Bento;
