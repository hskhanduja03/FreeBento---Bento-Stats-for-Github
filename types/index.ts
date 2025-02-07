export interface User {
  followers: { totalCount: number };
  gists: { totalCount: number };
  contributionsCollection: { totalCommitContributions: number };
  repositoriesContributedTo: { totalCount: number };
  pullRequests: { totalCount: number };
  issues: { totalCount: number };
  organizations: { totalCount: number };
  sponsors: { totalCount: number };
  repositoriesWithStargazerCount: {
    totalCount: number;
    nodes: { stargazerCount: number }[];
  };
}

export interface CodeStatsLeetcode {
  totalProblemsSolved: number;
  rating: number | null;
}


export interface CodeStatsCodeforce {
  maxRating: number;
  maxRank: string;
  numQuestions: number;
}

export interface CodeStatsCodingNinjas{
  totalProblems: number;
  rating: number;
}

export interface CodeStatsCodechef {
  dataOut: {
    stars: string;
    highestRating: number;
    totalProblemsSolved: number;
  };
}
export interface GitHubResponse {
  user: User;
  rateLimit: any;
}

export interface CodeStatsGFG {
  totalSolved: string;
  total_score: string;
}
