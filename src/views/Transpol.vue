<template>
  <div class="container">
    PZU
    <div class="flex_box">
      <label>Dojazd</label>
      <input
        v-model="dojazd"
        type="number"
      >
      <label>Holowanie</label>
      <input
        v-model="holowanie"
        type="number"
      >
      <label>Powrót</label>
      <input
        v-model="powrot"
        type="number"
      >
      <label>DMC</label>
      <input
        v-model="dmc"
        type="number"
      >
      <label>Miejsce zdarzenia</label>
      <input
        v-model="mz"
        type="text"
      >
      <label>Docelowe miejsce holowanie</label>
      <input
        v-model="dmh"
        type="text"
      >
      <label>Nr rej.</label>
      <input
        v-model="rej"
        type="text"
      >
      <button @click="alert(oblicz())">
        Oblicz
      </button>
      <p> {{ result }} </p>
      <p> {{ restultString }} </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dojazd: 0,
      holowanie: 0,
      powrot: 0,
      dmc: 0,
      mz: '',
      dmh: '',
      rej: '',
      ryczalt1: 220,
      c1d2200do100: 5.6,
      c2d2200pow100: 5.4,
      ryczalt2: 260,
      c1p2200dpdo100: 4,
      c1p2200hdo100: 5.6,
      c2p2200dppow100: 3.8,
      c2p2200hpow100: 5.4,
      result: 0,
      restultString: ''
    }
  },
  methods: {
    copyStringToClipboard (str) {
      // Create new element
      var el = document.createElement('textarea')
      // Set value (string to be copied)
      el.value = str
      // Set non-editable to avoid focus and move outside of view
      el.setAttribute('readonly', '')
      el.style = { position: 'absolute', left: '-9999px' }
      document.body.appendChild(el)
      // Select text inside element
      el.select()
      // Copy text to clipboard
      document.execCommand('copy')
      // Remove temporary element
      document.body.removeChild(el)
    },
    oblicz () {
      this.restultString = 'Grupa I, \n'
      this.restultString += `Dojazd: ${this.dojazd} km,\n`
      this.restultString += `Holowanie: ${this.holowanie} km,\n`
      this.restultString += `Powrót: ${this.powrot} km,\n`
      this.restultString += `DMC: ${this.dmc} kg,\n`
      this.restultString += `Miejsce zdarzenia: ${this.mz},\n`
      this.restultString += `Docelowe miejsce holowania: ${this.dmh},\n`
      this.restultString += `Nr rej.: ${this.rej},\n`
      this.restultString += 'Rozliczenie kosztów: \n'
      this.result = 0
      if (this.dmc <= 2000) {
        // do dmc 2200
        let kms = this.holowanie
        // sprawdzanie po trojkacie
        // alert(`${this.dojazd} ${this.holowanie} ${this.powrot}`)
        if (((parseInt(this.dojazd) + parseInt(this.powrot)) - parseInt(this.holowanie)) > 10) {
          kms = (parseInt(this.dojazd) + parseInt(this.holowanie) + parseInt(this.powrot)) / 2
          this.restultString += `Po trójkącie: (${this.dojazd} km + ${this.holowanie} km + ${this.powrot} km) / 2 = ${kms} km,\n`
          // alert(kms)
        }
        this.result += this.ryczalt1
        this.restultString += `ryczałt 30 km = ${this.ryczalt1} zł netto,\n`
        this.copyStringToClipboard(this.restultString)
        if (kms <= 30) return this.result
        if (kms <= 200) {
          this.result += (kms - 30) * this.c1d2200do100
          this.restultString += `${kms - 30} km * ${this.c1d2200do100} zł netto = ${((kms - 30) * this.c1d2200do100).toFixed(2)} zł netto,\n`
          this.restultString += `Razem: ${this.result} zł netto.\n`
          this.copyStringToClipboard(this.restultString)
          return this.result
        } else {
          this.result += (kms - 30) * this.c2d2200pow100
          this.restultString += `${kms - 30} km * ${this.c2d2200pow100} zł netto = ${((kms - 30) * this.c2d2200pow100).toFixed(2)} zł netto,\n`
          this.restultString += `Razem: ${this.result} zł netto.\n`
          this.copyStringToClipboard(this.restultString)
          return this.result
        }
      } else {
        let kms = parseInt(this.dojazd) + parseInt(this.holowanie) + parseInt(this.powrot)
        if (kms <= 50) {
          this.result = this.ryczalt2
          this.restultString += `ryczałt 50 km = ${this.ryczalt2} zł netto,\n`
          this.copyStringToClipboard(this.restultString)
          return this.result
        }
        let dp = parseInt(this.dojazd) + parseInt(this.powrot)
        if (kms <= 200) {
          this.result += dp * this.c1p2200dpdo100
          this.result += this.holowanie * this.c1p2200hdo100
          this.restultString += `(Dojazd + Powrót): ${dp} km * ${this.c1p2200dpdo100} zł netto = ${(dp * this.c1p2200dpdo100).toFixed(2)} zł netto, \n`
          this.restultString += `(Holowanie): ${this.holowanie} km * ${this.c1p2200hdo100} zł netto = ${(this.holowanie * this.c1p2200hdo100).toFixed(2)} zł netto,\n`
          this.restultString += `Razem: ${this.result} zł netto.\n`
          this.copyStringToClipboard(this.restultString)
          return this.result
        }
        this.result += dp * this.c2p2200dppow100
        this.result += this.holowanie * this.c2p2200hpow100
        this.restultString += `(Dojazd + Powrót): ${dp} km * ${this.c2p2200dppow100} zł netto = ${(dp * this.c2p2200dppow100).toFixed(2)} zł netto, \n`
        this.restultString += `(Holowanie): ${this.holowanie} km * ${this.c2p2200hpow100} zł netto = ${(this.holowanie * this.c2p2200hpow100).toFixed(2)} zł netto,\n`
        this.restultString += `Razem: ${this.result} zł netto.\n`
        this.copyStringToClipboard(this.restultString)
        return this.result
      }
    }
  }
}
</script>

<style>
.container {
    width: 100%;
    height: 100vh;
    background-color: rgb(43, 145, 204);
}
 .flex_box {
     display: flex;
     flex-direction: column;
     max-width: 500px;
     gap: 20px;
     padding-top: 30px;
     margin: 0 auto;
 }
      input {
         padding: 20px;
     }
</style>
