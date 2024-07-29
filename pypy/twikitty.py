from flask import Flask, jsonify, request, abort
import asyncio
import json
import os
from dotenv import load_dotenv
from twikit import Client
from functools import wraps

load_dotenv()

app = Flask(__name__)

USERNAME = os.getenv('TWITTER_USERNAME')
EMAIL = os.getenv('TWITTER_EMAIL')
PASSWORD = os.getenv('TWITTER_PASSWORD')
API_KEY = os.getenv('API_KEY')  # Load the API key from the environment
client = Client('en-US')

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.headers.get('x-api-key') != API_KEY:
            abort(401)  # Unauthorized
        return f(*args, **kwargs)
    return decorated_function

async def fetch_user_data(handle):
    await client.login(
        auth_info_1=USERNAME,
        auth_info_2=EMAIL,
        password=PASSWORD
    )

    USER_SCREEN_NAME = handle
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
    return user_obj

async def fetch_tweets(handle):
    await client.login(
        auth_info_1=USERNAME,
        auth_info_2=EMAIL,
        password=PASSWORD
    )

    USER_SCREEN_NAME = handle
    user = await client.get_user_by_screen_name(USER_SCREEN_NAME)
    user_id = user.id
    user_tweets = await client.get_user_tweets(user_id, 'Tweets', count=50)
    
    overall_arr = []
    for tweet in user_tweets:
        single = await process_tweet(client, tweet)
        overall_arr.append(single)

    more_tweets = await user_tweets.next()
    for tweet in more_tweets:
        single = await process_tweet(client, tweet)
        overall_arr.append(single)

    return overall_arr

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

@app.route('/api/user-data', methods=['GET'])
@require_api_key
def get_user_data():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Username query parameter is required"}), 400
    user_obj = asyncio.run(fetch_user_data(username))
    return jsonify(user_obj)

@app.route('/api/tweets', methods=['GET'])
@require_api_key
def get_tweets():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Username query parameter is required"}), 400
    overall_arr = asyncio.run(fetch_tweets(username))
    return jsonify(overall_arr)
    return []

if __name__ == '__main__':
    app.run(debug=True)