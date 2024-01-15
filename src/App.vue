<script setup>
  import { ref } from 'vue'
  import Alerta from './components/Alerta.vue'
  import Spinner from './components/Spinner.vue'
  import useCripto from './composables/useCripto.js'

  const { monedas, criptomonedas, cotizar, cargando, cotizacion, mostrarResultado, obtenerResultados } = useCripto()
  const error = ref('')

  const validarFormulario = () => {
    if (Object.values(cotizar).includes('')) {
      error.value = 'Todos los campos son obligatorios'

      setTimeout(() => {
        error.value = ''
      }, 3000)
      return
    }

    obtenerResultados()
  }
</script>

<template>
  <div class="contenedor">
    {{ resultado }}
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

    <div class="contenido">
      <form @submit.prevent="validarFormulario" class="formulario">
        <Alerta v-if="error">{{ error }}</Alerta>
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select v-model="cotizar.moneda" id="moneda">
            <option value="">--Seleccione--</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>
        <div class="campo">
          <label for="criptomoneda">Criptomoneda:</label>
          <select v-model="cotizar.criptomoneda" id="criptomoneda">
            <option value="">--Seleccione--</option>
            <option v-for="cripto in criptomonedas" :value="cripto.CoinInfo.Name">{{ cripto.CoinInfo.FullName }}</option>
          </select>
        </div>
        <input type="submit" value="Cotizar">
      </form>

      <Spinner v-if="cargando" />

      <div v-if="mostrarResultado" class="contenedor-resultado">
        <h2>Cotización</h2>

        <div class="resultado">
          <img :src="'https://www.cryptocompare.com' + cotizacion.IMAGEURL" alt="Imagen cripto">
          <div>
            <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
            <p>El precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span></p>
            <p>El precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span></p>
            <p>Variación últimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR
 }}%</span></p>
            <p>Última actualización: <span>{{ cotizacion.CONVERSIONLASTUPDATE
 }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
