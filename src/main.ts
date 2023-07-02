import dotenv from 'dotenv';
dotenv.config(<any>{ // typings werent updated in a while so the override option isnt there
    path: `./environment/.env`,
    override: true
});

import path from 'path';
import mineflayer from 'mineflayer';
// @ts-ignore
import { mineflayer as viewer } from 'prismarine-viewer';
import { mapDownloader } from 'mineflayer-item-map-downloader';
try {
    const bot = mineflayer.createBot({
        username: <any>process.env.username,
        host: <any>process.env.server,
        port: Number.parseInt(<any>process.env.port),
        auth: <any>process.env.auth,
        'mapDownloader-saveToFile': true, // default,
        'mapDownloader-outputDir': './maps'
    });

    bot.loadPlugin(mapDownloader) // load it before spawning to get all maps

    bot.once("spawn", () => {
        bot.chat("Hello everyone!");

        viewer(bot, { port: 3007, firstPerson: false })

        console.log(bot.inventory)
    });

    bot.on("move", () => {
        let friend = bot.nearestEntity();

        if (friend) {
            bot.lookAt(friend.position.offset(0, friend.height, 0));
        }
    });

    var walking = false;

    bot.on("entityHurt", (entity) => {
        if (entity != bot.entity) return;
        walking = !walking;
        bot.setControlState("forward", walking);
    });

    // @ts-ignore
    bot.on('new-map', (name, png, id) => {
        console.log('new map')
        console.log(png.toString('base64'));
    });
    // @ts-ignore
    bot.on('new_map_saved', (name, id) => {
        console.log('saved map: ', name)
    });
} catch (err) {
    console.log(err)
}