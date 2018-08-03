select likes, posts, followers from users
join goals on users.id = goals.users_id
where social_network = $1 and users.id = $2;