<script lang="ts">
    import { pageName } from "../../stores";
    
    let currentPageName: string = "Page";

    pageName.subscribe((value) => {
        currentPageName = value;
    });
</script>

<div class="flex">
<ul class="flex flex-col p-5 bg-stone-800 h-screen text-center space-y-5">
    <li class="flex-1"><a href="/user/dashboard"><img src="../icons/dashboard.svg" alt="Dashboard" class="hover:bg-stone-700 rounded"></a></li>
    <li class="justify-self-end"><a href="/user/settings"><img src="../icons/settings.svg" alt="Settings" class="hover:bg-stone-700 rounded"></a></li>
    <li class="justify-self-end"><form method="POST" action="?/logout"><button formaction="..?/logout"><img src="../icons/logout.svg" alt="Logout" class="hover:bg-stone-700 rounded"></button></form></li>
</ul>
<div class="p-5 w-full flex flex-col">
<h1 class="text-center font-bold text-2xl">{currentPageName}</h1>
<slot></slot>
</div>
</div>