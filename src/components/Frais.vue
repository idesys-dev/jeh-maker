<template>
    <table class="ui celled collapsing table">
        <tr class="center aligned">
            <td>Frais</td>
            <td>
                <sui-input id="input-frais" type="number" v-model="content" @input="handleInput" icon="euro" size="10" />
            </td>
        </tr>
        <tr class="center aligned">
            <td>Total HT</td>
            <td id="frais-ht">{{ totalPrice + value | euro }}</td>
        </tr>
        <tr class="center aligned">
            <td>Total TTC</td>
            <td id="frais-ttc">{{ (totalPrice + value) * 1.2 | euro }}</td>
        </tr>
    </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Frais extends Vue {
    @Prop() value!:number
    @Prop() totalPrice!:number

    content:number = this.value

    handleInput (e) {
      this.$emit('input', this.content)
    }
}
</script>
