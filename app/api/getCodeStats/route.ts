import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  fetchCodingStatsCodechef,
  fetchCodingStatsCodeforce,
  fetchCodingStatsCodingNinjas,
  fetchCodingStatsGFG,
  fetchCodingStatsLeetcode,
} from "@/app/actions/fetchCodingStats";
import fetchGithubStats from "@/app/actions/fetchGithubStats";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const {
      fullname,
      profileImage,
      email,
      linkedin,
      github,
      linktreeUsername,
      twitterUsername,
      instagramUsername,
      leetcode,
      codeforces,
      codechefUsername,
      gfgUsername,
      codingNinjasUsername,
      githubStats,
    } = data;

    // Fetch GitHub stats if not provided
    const gitStats = githubStats || (github ? await fetchGithubStats({ username: github }) : null);

    // Fetch coding platform stats in parallel
    const [
      statsLeetcode,
      statsCodeforce,
      statsCodingNinjas,
      statsCodechef,
      statsGFG,
    ] = await Promise.all([
      leetcode ? fetchCodingStatsLeetcode({ username: leetcode }) : null,
      codeforces ? fetchCodingStatsCodeforce({ username: codeforces }) : null,
      codingNinjasUsername ? fetchCodingStatsCodingNinjas({ username: codingNinjasUsername }) : null,
      codechefUsername ? fetchCodingStatsCodechef({ username: codechefUsername }) : null,
      gfgUsername ? fetchCodingStatsGFG({ username: gfgUsername }) : null,
    ]);

    // Construct response object
    const response = {
      fullname,
      profileImage,
      email,
      social: {
        linkedin,
        linktree: linktreeUsername,
        twitter: twitterUsername,
        instagram: instagramUsername,
      },
      codingProfiles: {
        github: gitStats,
        leetcode: statsLeetcode,
        codeforces: statsCodeforce,
        coding_ninjas: statsCodingNinjas,
        codechef: statsCodechef,
        gfg: statsGFG,
      },
    };


    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
