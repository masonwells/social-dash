update goals
set 
    likes = $1,
    followers = $2,
    posts = $3
where social_network = $4 and users_id = $5
returning *;