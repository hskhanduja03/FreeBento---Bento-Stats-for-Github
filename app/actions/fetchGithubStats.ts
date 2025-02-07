import { GitHubResponse } from "@/types";

const fetchGithubStats = async ({ username }: { username: string }): Promise<(GitHubResponse & { username: string }) | null> => {
    const query = `
    query ($username: String!) {
      user(login: $username) {
        following {
          totalCount
        }
        followers {
          totalCount
        }
        gists {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
        }
        repositoriesContributedTo(
          first: 1
          contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
        ) {
          totalCount
        }
        pullRequests(first: 1) {
          totalCount
        }
        issues(first: 1) {
          totalCount
        }
        organizations(first: 1) {
          totalCount
        }
        sponsoring(first: 1) {
          totalCount
        }
        sponsors {
          totalCount
        }
        createdAt
        updatedAt
        repositoriesWithStargazerCount: repositories(
          first: 100
          privacy: PUBLIC
          ownerAffiliations: OWNER
          orderBy: { field: STARGAZERS, direction: DESC }
        ) {
          totalCount
          nodes {
            stargazerCount
          }
        }
      }
    }
  `;

  const variables = { username };

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub stats");
    }
    
    const data = await response.json();

    // Append username to the response
    return data.data
      ? { ...(data.data as GitHubResponse), username }
      : null;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
};

export default fetchGithubStats;
