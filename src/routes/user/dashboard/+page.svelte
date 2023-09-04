<script lang="ts">
    import { io } from "socket.io-client"
    import { pageName } from "../../../stores";

    pageName.set("Dashboard");

    const socket = io();

    let boatData={};
    socket.on('dataUpdate', (message) => {
        boatData = message;
    })

</script>

{#each Object.entries(boatData) as [name, value]}
    <p>{name} : {value}</p>
{/each}