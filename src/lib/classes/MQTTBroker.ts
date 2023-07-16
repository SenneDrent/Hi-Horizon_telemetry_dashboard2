// import * as mqtt from "mqtt";

// export function getMQTTClient(settings:object) {
//     let client = mqtt.connect(settings);
//     client.on('connect', function () {
//         console.log('Connected');
//     });

//     client.on('message', function (topic, message) {
//         // called each time a message is received
//         console.log('Received message:', topic, message.toString());
//     });

//     client.on('error', function (error) {
//         console.log(error);
//     });
    
//     client.subscribe('data');
//     console.log(client);
// }