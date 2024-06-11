<script lang="ts">
    export let bg
</script>
<div class="navbar top-0 {bg}">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">Flicksmith</a>
    </div>
    <div class="dropdown dropdown-bottom dropdown-end flex-none">
        <div tabindex="0" role="button" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </div>
        <ul tabindex="-1" class="dropdown-content z-[99] menu p-2 shadow-lg bg-base-200 rounded-box w-52">
            <li><a href="/how-it-works">How it Works</a></li>
            <li><a href="/faq">FAQ</a></li>
        </ul>      
    </div>
</div>

