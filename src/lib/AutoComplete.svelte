<script lang="ts">
	export let items: string[] = [];

	let inputVal: string = ''
	
	function onItemClicked(item: string) {
		document.activeElement?.blur()
		inputVal = item
	}

	$: filteredItems = items.filter(function(item) {
		return item.toLowerCase().includes(inputVal.toLowerCase())
	})

</script>

<div class="dropdown text-center">
  <input 
		name="category"
		class="input input-bordered mb-5 w-full min-w-80 max-w-100 min-w-none text-base-content" 
		placeholder="Pick a category"
		bind:value={inputVal}
   />
  <ul tabindex="-2" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto text-base-content">
    {#each filteredItems as item}
			<li>
				<button tabindex="-1" on:click|preventDefault={() => onItemClicked(item)}>{item}</button>
			</li>
		{/each}
  </ul>
</div>