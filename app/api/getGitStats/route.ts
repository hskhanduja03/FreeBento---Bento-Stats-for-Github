import { NextRequest } from 'next/server';
import fetchGithubStats from '../../actions/fetchGithubStats'; // Ensure this file is implemented
import { GitHubResponse } from '@/types'; // Define the type according to GitHub's response structure
import { NextResponse } from 'next/server'; // Import NextResponse for new API structure
import { log } from 'console';

export const GET = async (req: NextRequest) => {
  try {
    // Parse the URL to get the query parameters
    const url = new URL(req.url);
    const username = url.searchParams.get('username');

    // Validate username query parameter
    if (!username) {
      return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 });
    }

    // Fetch GitHub stats using the provided username
    const stats: GitHubResponse | null = await fetchGithubStats({ username });
    console.log(stats);
    // Check if the stats were successfully fetched
    if (stats) {
      return NextResponse.json(stats, { status: 200 }); // Return status code 200 with data
    } else {
      return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 }); // Return status code 500 with error message
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }); // Return status code 500 with error message
  }
};
