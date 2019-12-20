<template>
    <table class="ui celled collapsing table">
        <tr class="center aligned">
            <td>Frais</td>
            <td>
                <sui-input  type="number" v-model="content" @input="handleInput" icon="euro" size="10" />
            </td>
        </tr>
        <tr class="center aligned">
            <td>Total HT</td>
            <td>{{ totalPrice + value | round | euro }}</td>
        </tr>
        <tr class="center aligned">
            <td>Total TTC</td>
            <td>{{ (totalPrice + value) * 1.2 | round | euro }}</td>
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
