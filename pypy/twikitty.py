import asyncio
from twikit import Client
import json
import os
from dotenv import load_dotenv  # Import the load_dotenv function

load_dotenv()  # Load environment variables from .env file

USERNAME = os.getenv('USERNAME')
EMAIL = os.getenv('EMAIL')
PASSWORD = os.getenv('TWITTER_PASSWORD')
# Initialize client
client = Client('en-US')

async def process_tweet(client, tweet):
  single = {}
  tweet.retweet = False
  if tweet.retweeted_tweet is not None:
    tweet.retweet = True
    tweet = await client.get_tweet_by_id(tweet.retweeted_tweet.id)
  single = {
    'id': tweet.id,
    'text': tweet.text,
    'timestamp': tweet.created_at,
    # 'timestamp': tweet.created_at_datetime,
    'is_quote_status': tweet.is_quote_status,
    'quote': tweet.quote,
    'retweeted_tweet': tweet.retweeted_tweet,
    'in_reply_to': tweet.in_reply_to,
    'quote_count': tweet.quote_count,
    'reply_count': tweet.reply_count,
    'retweet_count': tweet.retweet_count,
    'favorite_count': tweet.favorite_count,
    'view_count': tweet.view_count,
    'thumbnail_url': tweet.thumbnail_url,
    'place': tweet.place,
  }
  single['media'] = []
  if tweet.media is not None:
    for media in tweet.media:
      if media['type'] == 'video':
        # Filter for the variant with bitrate 632000 and grab only the url
        variants = media['video_info']['variants']
        variant_632000 = next((v for v in variants if v.get('bitrate') == 632000), None)
        if variant_632000:
          single['media'].append({'type': 'video', 'content': variant_632000['url']})
      elif media['type'] == 'photo':
        single['media'].append({'type': 'photo', 'content': media['media_url_https']})
      else:
        single['wat'] = True
  else:
    single['media'] = None
  return single

async def main():
  await client.login(
    auth_info_1=USERNAME,
    auth_info_2=EMAIL,
    password=PASSWORD
  )

  USER_SCREEN_NAME = 'hasanabiupdates'
  user = await client.get_user_by_screen_name(USER_SCREEN_NAME)
  user_id = user.id
  user_tweets = await client.get_user_tweets(user_id, 'Tweets', count=50)
  user_obj = {
    'id': user_id,
    'screenname': user.screen_name,
    'pfp': user.profile_image_url,
    'banner': user.profile_banner_url,
    'desc': user.description,
    'urls': user.urls,
    'pinned': user.pinned_tweet_ids,
    'following': user.following_count,
    'followers': user.followers_count,
    'media': user.media_count,
    'tweets': user.statuses_count
  }
  
  overall_arr = []    
  for tweet in user_tweets:
    single = await process_tweet(client, tweet)
    overall_arr.append(single)

  more_tweets = await user_tweets.next()
  for tweet in more_tweets:
    single = await process_tweet(client, tweet)
    overall_arr.append(single)

  with open('user_obj.json', 'w') as f:
    json.dump(user_obj, f, indent=2)
  with open('tweets.json', 'w') as f:
    json.dump(overall_arr, f, indent=2)
  print(True)
  # return overall_arr

asyncio.run(main())