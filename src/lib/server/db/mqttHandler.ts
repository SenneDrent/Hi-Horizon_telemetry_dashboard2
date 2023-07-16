// import { getMQTTClient } from "$lib/classes/MQTTBroker.js"
import { fetchUser } from "./queries";
import * as mqtt from "mqtt";

export function sendMQTTmessageTest(settings:object) {
    let client = mqtt.connect(settings);
    client.on('connect', function () {
        console.log('Connected');
    });

    client.subscribe('data');
    client.publish('internet', "shutdown internet");

    client.on('message', function (topic, message) {
        // called each time a message is received
        console.log('Received message:', topic, message.toString());
    });

    client.on('error', function (error) {
        console.log(error);
    });
    
    client.end();  
}