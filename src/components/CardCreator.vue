<template>
    <div class="cardCreator">
        <CardPreview class="cardPreview" :icon="icon" :color="color" :img-link="imgLink" :name="name" :id="id" :details="details"/>

        <form>
            <label>Card ID/Number
                <input v-model.number="id">
            </label>
            <label>Card Name
                <input v-model="name">
            </label>
            <label>Card Picture
                <input v-model="imgLink">
            </label>
            <label>Card Description
                <input v-model="details">
            </label>
                <label>Font Awesome Symbol/Icon
            <input v-model="icon">
            </label>
            <label>Card Color
                <input type="color" v-model="color">
            </label>
            <button @click.prevent="saveOnClick">save</button>
        </form>
    </div>
    
</template>

<script>
    import CardPreview from '@/components/CardPreview';

    export default {
        name: "CardCreator",
        components: {CardPreview},
        data: function () {
          return {
              id: CardPreview.id,
              name: '',
              icon: '',
              imgLink: '',
              details: '',
              color: '',
          };
        },
        methods: {
            saveOnClick () {
                this.$emit('save-card', {
                    id: this.id,
                    name: this.name,
                    icon: this.icon,
                    imgLink: this.imgLink,
                    details: this.details,
                    color: this.color,
                });
                this.id = CardPreview.id;
                this.name = "";
                this.icon = "";
                this.imgLink = "";
                this.details = "";
                this.color = "";
            }
        }
    };
</script>

<style scoped>
    .cardCreator {
        position: relative;
        display: grid;
        grid-template-columns: 100%;
        justify-content: space-evenly;
    }

    .cardPreview {
        height: 15rem;
        width: 10rem;
    }

    input {
        width: 8rem;
    }

    input, label {
        display: inline-block;
    }

    @media only screen and (min-width: 768px) {
        .cardPreview {
            overflow: visible;
            height: 25rem;
            width: 20rem;
        }

        .cardCreator {
            grid-template-columns: auto auto;
        }
    }

</style>