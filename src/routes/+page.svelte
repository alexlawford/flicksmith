<script lang="ts">
import AutoComplete from '$lib/AutoComplete.svelte'
import { categories } from '$lib/categories'
import Header from '$lib/Header.svelte'
import { goto } from '$app/navigation';
import { userData } from '$lib/userData'

interface formResponse {
    success: boolean
    error: string
}

let form: formResponse

const handleSubmit = async (event: any) => {
    const formData = new FormData(event.currentTarget)
    const { category } = Object.fromEntries(formData) as {
        category: string
    }
    if(categories.includes(category)) {
        $userData.category = category
        goto('/questions/0')
    } else {
        form = {
            success: false,
            error: 'That category wasn’t recognised. Please choose one from the list'
        }
    }
}

</script>

<Header bg='bg-base-100' />

{#if form && ! form.success}
    <div role="alert" class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{form.error}</span>
    </div>
{/if}

<div class="relative flex items-center justify-center h-screen overflow-hidden">
    <div class="max-w-md relative z-30 text-white -mt-20">
        <div class="p-8">
            <h1 class="mb-5 text-4xl font-bold text-center">Find filmmakers now.</h1>
            <p class="mb-5 text-center">Flicksmith connects you with <strong class="text-yellow-300">amazing directors in the UK.</strong><br />Get pitches & quotes in as little as 48 hours.</p>
            <form method="POST" on:submit|preventDefault={handleSubmit}>
                <input type="hidden" value=0 name="question" />
                <AutoComplete items={categories} />
                <p class="mb-5 text-center">
                    <button class="btn btn-primary">Get Started</button>
                </p>
            </form>
            <p class="text-sm">Popular: commercial, music video, documentary, corporate film</p>
        </div>
    </div>

    <video autoplay muted loop playsinline class="absolute z-10 w-auto min-w-full min-h-full max-w-none">
        <source src="/background.mp4" type="video/mp4">
    </video>
</div>
