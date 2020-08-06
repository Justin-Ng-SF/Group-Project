const WebSocket = require('ws');
const options ={
    port: 4000, 
}

const redis = require('redis');
const client = redis.createClient();
const wss = new WebSocket.Server(options);
//const notes = [];
//client.subscribe('PubSubChannel');
//currently a copy of lab 9

//Broadcast
const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            // if currently active
            client.send(JSON.stringify(message));  //send to client from server
            //JSON to convert 
        }
    });
};

const updateUserCount = () => {
    broadcastMessage({
        type: 'UPDATE_USER_COUNT',
        count: wss.clients.size, //number of ws clients
    });
};

const broadcastNewNote = (newNote) => {
    notes.unshift(newNote);
    broadcastMessage({
        type: 'UPDATE_MESSAGES',
        notes, 
    });
};


//event 1 connection
wss.on('connection', (ws) => {  //ws represents a single connection to a single tab
    //when someone connects, this is call
    //ws stays open entire time you on page
    console.log('Someone connected'); //to test connection 
    updateUserCount();

    //event 2 message
    ws.on('message' , (message) => {
        console.log(message);
        const messageObject = JSON.parse(message);
        switch(messageObject.type){
            case 'SEND_MESSAGE':
                broadcastNewNote(messageObject.newNote);
                break;
            default:
                console.log('Message type not supported');
        }
    });

    //event 3 close, when client disconnects
    ws.on('close' , () => {
        console.log('Client has disconnected');
        updateUserCount();
    });

    //event 4 clent crashed
    ws.on('error', (e) => {
        console.log(e);
    });
})