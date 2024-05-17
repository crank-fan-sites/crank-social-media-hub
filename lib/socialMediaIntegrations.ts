async function fetchInstagramMedia(
  baseUrl: string,
  accessToken: string
): Promise<any[]> {
  let igMedia = [];
  const url = `${baseUrl}/api/instagram/media?token=${accessToken}`;
  console.log("instagram", url);
  try {
    const igResponse = await fetch(url);
    if (!igResponse.ok) {
      console.error(
        "Failed Instagram API call. Server responded with status",
        igResponse.status
      );
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
  const url = `${baseUrl}/api/discord/messages?channelId=${channelId}`;
  console.log("discord", url);
  try {
    const response = await fetch(url);
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
  const url = `${baseUrl}/api/patreon/posts?campaignId=${campaignId}&accessToken=${accessToken}`;
  console.log("patreon", url);
  try {
    const patreonResponse = await fetch(url);
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
  const url = `${baseUrl}/api/reddit/posts?subreddit=${subreddit}`;
  console.log("reddit", url);
  try {
    const redditResponse = await fetch(url);
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
