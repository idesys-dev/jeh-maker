<template>
  <div>
    <sui-button @click.native="toggle">Afficher les taux</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>Taux</sui-modal-header>
      <sui-modal-content image>
        <sui-modal-description>
        <table class="ui celled table">
          <thead>
            <tr>
                <th>Libelle</th>
                <th>Taux</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="label in Object.keys(content)" v-bind:key="label">
<<<<<<< HEAD
                  <td>{{description[label]}}</td>
                  <td><sui-input class="w-100" v-model="content[label]" @input="handleInput" type="text"/></td>
=======
                  <td>{{label}}</td>
                  <td><sui-input class="w-100"  v-model="content[label]" @input="handleInput" type="number"/></td>
>>>>>>> b4d972e (Save and restore taux URL)
              </tr>
          </tbody>
        </table>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TauxObject } from '../types'

@Component
export default class Taux extends Vue {
  @Prop() value!:TauxObject

  content:TauxObject = this.value
  open:boolean = false;
  description = {
    urssafBase: 'Base URSSAF',
    jeContrib: "Part JE : Total des taux des cotisations indexées sur l'assiette de cotisation",
    jepay: 'Part JE : Total des taux des cotisations indexées sur la rémunération brute',
    consultantContrib: "Part Etudiant : Total des taux des cotisations indexées sur l'assiette de cotisation",
    consultantPay: 'Part Etudiant : Total des taux des cotisations indexées sur la rémunération brute'
  }

  toggle () {
    this.open = !this.open
  }

  handleInput (e) {
    this.$emit('input', this.content)
  }
}
</script>
