<script lang="ts">
import { goto } from '$app/navigation';
import { userData, filledTo } from '$lib/userData'

export let question: number
export let budget: number

let email: string
let minutes: number
let numberOfActors: number
let numberOfLocations: number
let vfxMultiplier: number
let details: string = ""
let budgetAsString: string
let deadline: string
let postcode: string
let problem: string | undefined

let chosenCategory = $userData.category

const validateEmail = (email: string) => {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(email);
}

const validatePostode = (postcode: string) => {
    var re = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
    return re.test(postcode)
}

const isInt = (str: string) => {
    if (typeof str != "string") {
        return false
    }
    return !isNaN(str as unknown as number) && !isNaN(parseFloat(str))
}

const next = async (key: string, value: any, target: number) => {
    if(target < question || inputs[question].validate(value)) {
        $userData[key] = value
        $filledTo = Math.max(question, $filledTo)

        if(target < 10) {
            problem = undefined
            goto(String(target))
        } else {
            // filled in everything
            const response = await fetch("/submit/", {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify($userData)
            })
            const result = await response.json()
            if(result.success) {
                goto('/submitted')
            } else {
                problem = "Oh no, something went wrong, sorry! Maybe try again?"
            }
        }

    } else {
        problem = inputs[question].warning
    }
}

const inputs = [
    {
        title: "So, about your " + chosenCategory + "...",
        text: "We need to ask you eight simple questions to match you with directors that fit your job, and help them create a pitch perfectly tailored to your needs.",
        buttonText: "Ready? Get Started",
        validate: (x: any) => true,
        warning: ""
    },
    {
        title: "What’s your email?",
        text: "What email address should we send pitches to? A company email is ideal, if possible.",
        type: "input",
        placeholder: "you@example.com",
        buttonText: "Next →",
        validate: validateEmail,
        warning: "Please input a valid email address"
    },
    {
        title: "Where are you based??",
        text: "What area of the UK are you in? Please input a postcode.",
        type: "input",
        placeholder: "Eg. SL4 1PD",
        buttonText: "Next →",
        validate: validatePostode,
        warning: "Please input a valid UK postcode"
    },
    {
        title: "How many minutes?",
        text: "Roughly how long do you want your " + chosenCategory + " to be?",
        buttonText: "Next →",
        validate: isInt,
        warning: "Please choose an option"
    },
    {
        title: "Need paid actors/models?",
        text: "If you need paid actors, input roughly how many you need. If you don’t need any, just input zero.",
        buttonText: "Next →",
        validate: isInt,
        warning: "Please choose an option"
    },
    {
        title: "How many locations?",
        text: "Roughly how many different locations are involved?",
        buttonText: "Next →",
        validate: isInt,
        warning: "Please choose an option"
    },
    {
        title: chosenCategory == 'animation' ? "Level of quality?" : "Need VFX or animation?",
        text: chosenCategory == 'animation' ? "What level of quality do you need for your animation?" : "Does your project require VFX or animation?",
        option1: chosenCategory == 'animation' ? "Simple 2D" : "None/I’m not sure",
        option2: chosenCategory == 'animation' ? "Simple 3D" : "Some/a little",
        option3: chosenCategory == 'animation' ? "High quality 2D/3D" : "A lot",
        option4: chosenCategory == 'animation' ? "I want it to look like Disney/Pixar/Studio Ghibli" : "A lot, complex or very high quality",
        buttonText: "Next →",
        validate: isInt,
        warning: "Please choose an option"
    },
    {
        title: "Approximate budget?",
        text: "To help our directors know what to pitch, it’s useful to know your budget range. Don’t worry, you don’t need to be exact.",
        buttonText: "Next →",
        validate: (x: string) => x != 'Select option',
        warning: "Please choose an option"
    },
    {
        title: "Deadline",
        text: "When do you need the film completed by, including all post-production?",
        buttonText: "Next →",
        validate: (x: string) => x != '' && x != undefined,
        warning: "Please pick a date"
    },
    {
        title: "Anything else to add?",
        text: "Do you have any ideas in mind? What kind of tone are you after — for example comedic, dark, upbeat? Any references you like you can link to? The MORE DETAILS the better!",
        buttonText: "Finish and Submit!",
        validate: (x: string) => x.length > 50,
        warning: "We need a bit more detail than that, sorry!"
    },
]

const submit = (target: number) => {
    switch(question) {
        case 0:
            next('start', 'true', target)
            break;
        case 1:
            next('email', email, target)
            break;
        case 2:
            next('postcode', postcode, target)
            break;
        case 3:
            next('minutes', minutes, target)
            break;
        case 4:
            next('numberOfActors', numberOfActors, target)
            break;
        case 5:
            next('numberOfLocations', numberOfLocations, target)
            break;
        case 6:
            next('vfxMultiplier', vfxMultiplier, target)
            break;
        case 7:
            next('budgetAsString', budgetAsString, target)
            break;
        case 8:
            next('deadline', deadline, target)
            break
        case 9:
            next('details', details, target)
            break
    }
}

$: f = $filledTo

</script>
{#if problem}
    <div role="alert" class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{problem}</span>
    </div>
{/if}
{#if question > 0}
    <div class="join mb-5 mt-5 mx-auto flex justify-center">
        {#each {length: 9} as _, i}
            <button class="join-item btn
                {question == i + 1 ? 'btn-active' : ''}
                {f < i + 1 ? 'btn-disabled' : ''}"
                on:click={() => submit(i + 1)}
            >{i + 1}</button>
        {/each}
    </div>
{/if}
<div class="relative h-screen">
    <div class="m-auto max-w-xl mt-12 p-8">
        <h1 class="mb-5 text-4xl font-bold text-center text-base-content">{inputs[question]?.title}</h1>
        <p class="mb-5 text-center">{inputs[question]?.text}</p>
        {#if question == 1}
            <p class="mb-5 text-center">
                <input 
                    type="email"
                    class="input input-bordered w-full text-slate-900 max-w-xs" 
                    placeholder={inputs[question]?.placeholder}
                    bind:value={email}
                />
            </p>
        {:else if question == 2}
            <div class="mb-5 text-center">
            <input 
                type="text"
                class="input input-bordered w-full text-slate-900 max-w-xs" 
                placeholder={inputs[question]?.placeholder}
                bind:value={postcode}
            />
            </div>
        {:else if question == 3}
            <div class="mb-5 text-center">
                <select class="select select-bordered w-full max-w-xs" bind:value={minutes}>
                    <option disabled selected>Select approximate length</option>
                    <option value=1>Less than 1 minute</option>
                    <option value=1>About a minute</option>
                    <option value=2>About 2 minutes</option>
                    <option value=4>3-5 minutes</option>
                    <option value=8>5-10 minutes</option>
                    <option value=15>10-20 minutes</option>
                    <option value=30>20-45 minutes</option>
                    <option value=60>45+ minutes</option>
                </select>
            </div>
        {:else if question == 4}
            <div class="mb-5 text-center">
                <select class="select select-bordered w-full max-w-xs" bind:value={numberOfActors}>
                    <option disabled selected>Select number of actors</option>
                    <option value=0>None</option>
                    <option value=1>One</option>
                    <option value=3>Two to four</option>
                    <option value=6>Five or more</option>
                </select>
            </div>
        {:else if question == 5}
            <div class="mb-5 text-center">
                <select class="select select-bordered w-full max-w-xs" bind:value={numberOfLocations}>
                    <option disabled selected>Select number of locations</option>
                    <option value=1>One</option>
                    <option value=3>Two to four</option>
                    <option value=6>Five or more</option>
                </select>
            </div>
        {:else if question == 6}
            <div class="mb-5 text-center">
                <select class="select select-bordered w-full max-w-xs" bind:value={vfxMultiplier}>
                    <option disabled selected>Select option</option>
                    <option value=0>{inputs[question]?.option1}</option>
                    <option value=1>{inputs[question]?.option2}</option>
                    <option value=2>{inputs[question]?.option3}</option>
                    <option value=3>{inputs[question]?.option4}</option>
                </select>
            </div>
        {:else if question == 7}
            <div class="mb-5 text-center">
                <select class="select select-bordered w-full max-w-xs" bind:value={budgetAsString}>
                    <option disabled selected>Select option</option>
                    <option>Less than £{budget.toLocaleString()}</option>
                    <option>£{(budget).toLocaleString()} to £{(budget * 2).toLocaleString()}</option>
                    <option>£{(budget * 2).toLocaleString()} to £{(budget * 4).toLocaleString()}</option>
                    <option>More than £{(budget * 4).toLocaleString()}</option>
                </select>
            </div>
        {:else if question == 8} 
            <div class="mb-5 text-center">
                <input type="date" class="select select-bordered w-full max-w-xs" bind:value={deadline}/>
            </div>
        {:else if question == 9}
            <div class="mb-5 text-center">
                <textarea class="textarea textarea-bordered w-full max-w-xl" placeholder="Add some details here" bind:value={details}></textarea>
            </div>
        {/if}

        <p class="mb-5 text-center"><button class="btn btn-primary" on:click={() => submit(question + 1)}>{inputs[question]?.buttonText}</button></p>
    </div>
</div>
