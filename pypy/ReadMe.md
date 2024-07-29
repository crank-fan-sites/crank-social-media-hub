### API

curl -H "x-api-key: your_api_key_here" "http://127.0.0.1:5000/api/user-data?username={UserName}"
curl -H "x-api-key: your_api_key_here" "http://127.0.0.1:5000/api/tweets?username={UserName}"

outputs either some user info or last ~24 tweets

'reweet': tweet.retweet == BOOL
'id': tweet.id,
'text': tweet.text,
'timestamp': tweet.created_at,
'is_quote_status': tweet.is_quote_status,
'quote': tweet.quote,
'retweeted_tweet': tweet.retweeted_tweet, IGNORE
'in_reply_to': tweet.in_reply_to,
'quote_count': tweet.quote_count,
'reply_count': tweet.reply_count,
'retweet_count': tweet.retweet_count,
'favorite_count': tweet.favorite_count,
'view_count': tweet.view_count,
'thumbnail_url': tweet.thumbnail_url,
'place': tweet.place,
