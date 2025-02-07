import {
  CodeStatsLeetcode,
  CodeStatsCodeforce,
  CodeStatsCodingNinjas,
  CodeStatsCodechef,
  CodeStatsGFG,
} from "@/types";
const { JSDOM } = require("jsdom");

const fetchCodingStatsLeetcode = async ({
  username,
}: {
  username: string;
}): Promise<CodeStatsLeetcode | null> => {
  const query = `
      query getUserStats($username: String!) {
        matchedUser(username: $username) {
          languageProblemCount {
            problemsSolved
          }
        }
        userContestRanking(username: $username) {
            rating
        }
      }
    `;

  const variables = { username };

  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch LeetCode stats");
    }

    const data = await response.json();
    if (!data.data || !data.data.matchedUser) return null;

    // Calculate total problems solved
    const totalProblemsSolved =
      data.data.matchedUser.languageProblemCount?.reduce(
        (sum: number, lang: { problemsSolved: number }) =>
          sum + lang.problemsSolved,
        0
      ) || 0;

    // Get rating (handle cases where rating is missing)
    const rating = data.data.userContestRanking?.rating ?? null;

    return { totalProblemsSolved, rating };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return null;
  }
};

const fetchCodingStatsCodeforce = async ({
  username,
}: {
  username: string;
}): Promise<CodeStatsCodeforce | null> => {
  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    const response2 = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}`
    );

    if (!response.ok || !response2.ok)
      console.log("Failed to fetch Codeforces stats");

    const data = await response.json();
    const data2 = await response2.json();

    if (!data?.result?.[0] || !data2?.result) return null;

    const user = data.result[0];
    const submissions = data2.result;

    let numQuestions = submissions.filter(
      (sub: any) => sub.verdict === "OK"
    ).length;

    return {
      maxRating: user.maxRating ?? 0,
      maxRank: user.maxRank ?? "unrated",
      numQuestions: numQuestions,
    };
  } catch (error) {
    console.error("Error fetching Codeforces stats:", error);
    return null;
  }
};

const fetchCodingStatsCodingNinjas = async ({
  username,
}: {
  username: string;
}): Promise<CodeStatsCodingNinjas | null> => {
  try {
    const response = await fetch(
      `https://www.naukri.com/code360/api/v3/public_section/profile/user_details?uuid=${username}&app_context=publicsection&naukri_request=true`
    );

    if (!response.ok) console.log("Failed to fetch Coding Ninjas profile data");

    const { data } = await response.json();
    if (!data?.uuid) return null;

    const response2 = await fetch(
      `https://www.naukri.com/code360/api/v3/public_section/user_rating_data?uuid=${data.uuid}&app_context=publicsection&naukri_request=true`
    );

    if (!response2.ok)
      throw new Error("Failed to fetch Coding Ninjas rating data");

    const { data: data2 } = await response2.json();
    if (!data2) return null;

    return {
      totalProblems: data?.dsa_domain_data?.problem_count_data?.total_count,
      rating: data2?.current_user_rating,
    };
  } catch (error) {
    console.error("Error fetching Coding Ninjas stats:", error);
    return null;
  }
};

const fecher = async (handle: string) => {
  try {
    const resdata = await fetch(`https://www.codechef.com/users/${handle}`);
    if (resdata.status === 200) {
      let d = await resdata.text();
      let dom = new JSDOM(d);
      let document = dom.window.document;

      // Extracting stars and highest rating
      let stars =
        document.querySelector(".rating")?.textContent.trim() || "unrated";
      let highestRating =
        parseInt(
          document
            .querySelector(".rating-number")
            ?.parentNode?.children[4]?.textContent?.split("Rating")[1]
        ) || 0;

      // Extracting total problems solved
      const problemsSolvedSection = document.querySelector(
        ".rating-data-section.problems-solved"
      );
      let totalProblemsSolved = 0;
      if (problemsSolvedSection) {
        const lastH3 = problemsSolvedSection.querySelectorAll("h3");
        if (lastH3.length > 0) {
          const lastH3Text = lastH3[lastH3.length - 1].textContent.trim();
          totalProblemsSolved = parseInt(lastH3Text.match(/\d+/)[0], 10) || 0;
        }
      }

      return {
        success: true,
        status: resdata.status,
        dataOut: {
          stars,
          highestRating,
          totalProblemsSolved,
        },
      };
    } else {
      return { success: false, status: resdata.status, dataOut: {} };
    }
  } catch (e) {
    console.log(e);
    return { success: false, status: 404, dataOut: {} };
  }
};

const fetchCodingStatsCodechef = async ({
  username,
}: {
  username: string;
}): Promise<CodeStatsCodechef | null> => {
  try {
    const { success, dataOut } = await fecher(username);
    if (success) {
      return dataOut;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching CodeChef stats:", error);
    return null;
  }
};

async function getUserData(userName: string): Promise<any> {
  try {
    const url = `https://www.geeksforgeeks.org/user/${userName}/`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`Failed to fetch data for user ${userName}`);
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const rankElement = document.querySelector(".scoreCards_head__G_uNQ");

    if (!rankElement) {
      return null;
    }

    const totalSolved =
      rankElement.children[2]
        ?.querySelector(".scoreCard_head_left--score__oSi_x")
        ?.textContent.trim() || "0";

    const contestRating =
      rankElement.children[0]
        ?.querySelector(".scoreCard_head_left--score__oSi_x")
        ?.textContent.trim() || "0";

    return {
      totalSolved,
      contestRating,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const fetchCodingStatsGFG = async ({
  username,
}: {
  username: string;
}): Promise<CodeStatsGFG | null> => {
  try {
    const userData = await getUserData(username);
    if (!userData || userData.Status) {
      return null;
    }

    return {
      total_score: userData.contestRating,
      totalSolved: userData.totalSolved,
    };
  } catch (error) {
    console.error("Error fetching GFG stats:", error);
    return null;
  }
};

export {
  fetchCodingStatsLeetcode,
  fetchCodingStatsCodeforce,
  fetchCodingStatsCodingNinjas,
  fetchCodingStatsCodechef,
  fetchCodingStatsGFG,
};
