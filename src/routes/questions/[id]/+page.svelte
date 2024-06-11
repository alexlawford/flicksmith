<script lang="ts">
import { page } from '$app/stores'
import Header from '$lib/Header.svelte'
import Question from '$lib/Question.svelte'
import { userData } from '$lib/userData'
import { categoryScores } from '$lib/categories'

const round = (num: number) => {
    const len = Math.ceil(Math.log10(num + 1))
    const denominator = Math.pow(10, len - 1)
    const t = Math.round(num / denominator) * denominator
    return t > 1000 ? t : 1000
}

const topNav = (no: number) => {
    return 3
}

$: id = Number($page.params.id)

$: budget = (() => {
    let cat = ($userData.category || "campaign") as keyof typeof categoryScores
    let days = $userData.minutes / categoryScores[cat]
    let cameraAndLighting = 1200 * days
    let sound = 500 * days
    let hamua = Math.min(150 * $userData.numberOfActors, 300) * days
    let art = Math.min(500 * $userData.numberOfLocations, 1000) * days
    let post = (400 * days) + (400 * $userData.vfxMultiplier * days)
    let director = 800 * days
    let total = 2.5 * (director + cameraAndLighting + sound + hamua + art + post)
    return round(total)
})()


</script>
<Header bg='bg-base-300' />
<Question question={id} budget={budget} />