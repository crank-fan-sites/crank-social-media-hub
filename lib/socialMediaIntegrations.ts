async function fetchInstagramMedia(
  baseUrl: string,
  accessToken: string
): Promise<any[]> {
  let igMedia = [];
  try {
    const igResponse = await fetch(
      `${baseUrl}/api/instagram/media?token=${accessToken}`
    );
    if (!igResponse.ok) {
      console.error("Failed Instagram API call");
      return igMedia;
    }
    igMedia = await igResponse.json();
  } catch (error) {
    console.error("Error fetching Instagram media", error);
  }
  return igMedia;
}

async function fetchDiscordMessages(
  baseUrl: string,
  channelId: string
): Promise<any[]> {
  let discordMessages = [];
  try {
    const response = await fetch(
      `${baseUrl}/api/discord/messages?channelId=${channelId}`
    );
    if (!response.ok) {
      console.error(
        "Failed to load Discord messages: Server responded with status",
        response.status
      );
      return discordMessages;
    }
    discordMessages = await response.json();
  } catch (error) {
    console.error("Failed to load Discord messages", error);
  }
  return discordMessages;
}

async function fetchPatreonPosts(
  baseUrl: string,
  campaignId: string,
  accessToken: string
): Promise<any[]> {
  let patreonPosts = [];
  try {
    const patreonResponse = await fetch(
      `${baseUrl}/api/patreon/posts?campaignId=${campaignId}&accessToken=${accessToken}`
    );
    if (!patreonResponse.ok) {
      console.error(
        `Failed to fetch Patreon posts: Server responded with status ${patreonResponse.status}`
      );
      return patreonPosts;
    }
    const patreonPostsResponse = await patreonResponse.json();
    patreonPosts = patreonPostsResponse.data || [];
  } catch (error) {
    console.error("Error fetching Patreon posts:", error);
  }
  return patreonPosts;
}

async function fetchRedditPosts(
  baseUrl: string,
  subreddit: string
): Promise<any[]> {
  let redditPosts = [];
  try {
    const redditResponse = await fetch(
      `${baseUrl}/api/reddit/posts?subreddit=${subreddit}`
    );
    if (!redditResponse.ok) {
      console.error(
        "Failed to fetch Reddit posts: Server responded with status",
        redditResponse.status
      );
      return redditPosts;
    }
    redditPosts = await redditResponse.json();
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
  }
  return redditPosts;
}

export {
  fetchInstagramMedia,
  fetchDiscordMessages,
  fetchPatreonPosts,
  fetchRedditPosts,
};
