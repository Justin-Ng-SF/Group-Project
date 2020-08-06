# Group-Project
Worked in a group of 8 with the following guidelines: 
Tech Requirements
Node back end
Microservice architecture
http
GET
only url
POST
url + body
React front end
redux
redux thunk
“global state”
Use if multiple components share a value
react-router
websocket (2 way)
state/props (notes)
props: passed in
props are read only
state: declared in component
clears any time it mounts
Storage
redis (cache)
key/value storage
pubsub
caching for quick access
not long term
store for a certain amount of time
amount of storage
kicks out data on purpose
mongodb (database)
nosql
json
kafka (queue)
decouples the services that need heavy work from those that do the heavy work
Benefits:
don’t wait for heavy work to finish
add more workers at the end of the queue
add more publishers, it won’t flood the works
alerts the consumers/workers
some don’t do this, aws doesn’t have this
Devops
All services run as docker containers
Single docker compose file
If you get it running on ec2: Extra credit

Base architecture requirements
Assume all services are clusterizable
User service (auth)
user collection
Notification service (real time updates)
holds ws connections
alert via redis pubsub
similar to swarm demo
does not need to know any business logic
transaction service
Store transactions when user purchases something in mongodb
who bought it 
what it was
how much it was
Push transaction to kafka queue (offline slow processing)
Headed to receipt service
most of the business logic
inventory service
Has items, prices and inventory
Receipt service
kafka consumer
send email to user
make a throw away gmail account, don’t commit the password to the repo, use an environment variable







Use Cases
Seller
Has inventory management
box to enter an item
Shows sales
list
only their own
Buyer
show catalog
list
every item from every seller
okay to display if not logged in
Create purchases
single item
fancier would be a cart
show purchase history
list
Show item pages
/items?itemId=123
item has its own detail page
show how many people are viewing an item (real time)
Websocket
show number of times sold
Both
Display banner notifications when something is purchased (news feed)
Synchronize transactions across all tabs
Example: buy something in one tab, shows up in the other 

