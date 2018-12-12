<template>
    <div class="cardSlot">
        <slot></slot>
    <button @click="$emit('discard-card', id)">Discard</button>
    </div>
</template>

<script>
    export default {
        name: "CardSlot",
        props: {
            id: {
                required: true
            }
        }
    };
</script>

<style scoped>
    .cardSlot{
        border: 2px solid blue;
        padding: 1rem;
    }

</style>