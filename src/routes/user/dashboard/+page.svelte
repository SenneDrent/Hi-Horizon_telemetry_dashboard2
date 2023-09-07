<script lang="ts">
    import { io } from "socket.io-client"
    import { pageName } from "../../../stores";
    import { writable, type Writable } from "svelte/store";

    pageName.set("Dashboard");
    export let data;

    const socket = io();

    let boatData:any = data.dataFrame;
    socket.on('dataUpdate', (message) => {
        boatData = message;
    });

    let statusColor: string = "";
    const currentDate = new Date();
    let timeSinceLastFrame: Writable<number> = writable(Math.round(currentDate.getTime()/1000) - boatData.UnixTime);
    setInterval(()=> {
        const currentDate = new Date();
        timeSinceLastFrame.set(Math.round(currentDate.getTime()/1000) - boatData.UnixTime);
    },1000);

    $: if ($timeSinceLastFrame > 20) statusColor = "text-red-600";
    function getFullNameFromAbbreviation(abbreviation:string) {
       let statistic:any[] = data.dataFrameStructure.filter((t:any) => t.abbreviation === abbreviation);
       return statistic[0].name;
    }
</script>

<div class="pt-5 space-y-3">
    <div class="p-3 rounded bg-stone-800" >
    {#each Object.entries(boatData) as [name, value]}
        {#if name !== "UnixTime"}
            <p>{getFullNameFromAbbreviation(name)} : {value}</p>
        {/if}
    {/each}
    </div>
    <div class="p-3 rounded bg-stone-800">
        <div class="font-bold">Status</div>
        <div class="{statusColor}">time since last Frame: {$timeSinceLastFrame}s</div>
    </div>
</div>