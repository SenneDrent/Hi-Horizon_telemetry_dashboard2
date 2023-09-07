<script lang="ts">
    import { onMount } from "svelte";
    import { cubicOut } from "svelte/easing";
import { fly } from "svelte/transition";

let showImage: boolean = false;
onMount(()=>{
    showImage = true;
});

</script>


<div class="flex flex-col items-center justify-center h-screen">
    {#if showImage === true}
        <img src="/Logo.png" alt="Logo" class="h-52 z-0" in:fly={{duration: 1000, easing: cubicOut, x:0, y:'100%'}}>
    {:else}
        <div class="h-52"></div>
    {/if}
    <div class="flex flex-col bg-stone-900 z-10 pb-10 mt-3">
        <h1 class="font-bold text-2xl pb-5">Hi-Horizon Racing Team Telemetry Dashboard</h1>
        <form class="flex flex-col space-y-3 w-1/2 self-center" method="POST" action="?/login">
            <input class="text-stone-900 rounded text-center" placeholder="username" name="username" value="admin">
            <input type="password" class="text-stone-900 rounded text-center" placeholder="password" name="password" value="test">
            <button type="submit" class="bg-red-600 hover:bg-red-500 rounded">Login</button>
        </form>
    </div>
</div>