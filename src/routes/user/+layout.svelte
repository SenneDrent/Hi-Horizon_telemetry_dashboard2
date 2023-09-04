<script lang="ts">
    import { pageName } from "../../stores";
    
    let currentPageName: string = "Page";

    pageName.subscribe((value) => {
        currentPageName = value;
    });
</script>

<div class="flex">
<ul class="flex flex-col p-5 bg-stone-800 h-screen text-center">
    <li class="flex-1"><a href="/user/dashboard">Dashboard</a></li>
    <li class="justify-self-end"><a href="/user/settings">Settings</a></li>
</ul>
<div class="p-5 w-full">
<h1 class="text-center font-bold text-2xl">{currentPageName}</h1>
<slot></slot>
</div>
</div>