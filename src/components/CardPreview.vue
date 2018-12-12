<template>
    <div class="card" :style="{borderColor:color, backgroundColor:color}">
        <div class="name" :style="{borderColor:color}">{{name}}</div>
        <div class="id"><i :class="icon" :style="{borderColor:color}"></i>{{id}}</div>
        <img :src="imgLink">
        <p>{{details}}</p>
    </div>
</template>
<script>
    export default {
        name: 'CardPreview',
        props: {
            imgLink: {
                type: String
            },
            name: {
                type: String
            },
            id: {
                type: Number
            },
            details: {
                type: String
            },

            icon: {
                type: String
            },

            color: {
                type: String
            }
        }
    }
</script>

<style scoped>

    .card {
        display: grid;
        grid-template-areas:
                    'name id'
                    'pic pic'
                    'details details';
        grid-template-rows: auto 1fr auto;
        height: 25rem;
        width: 20rem;
        border-radius: .4rem;
        border-style: solid;
        border-width: .2rem;
        padding: .5rem;
    }

    .id {
        grid-area: id;
        padding-left: 4rem;
        background-color: rgba(255, 255, 255, .75);
    }

    img {
        grid-area: pic;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }

    .name {
        grid-area: name;

        background-color: rgba(255, 255, 255, .75);

    }

    p {
        grid-area: details;
        background-color: rgba(255, 255, 255, .75);
        padding-bottom: 1rem;
    }
</style>