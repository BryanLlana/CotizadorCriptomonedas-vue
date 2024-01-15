import { onMounted, ref, reactive, computed } from 'vue'

const useCripto = () => {
  const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', texto: 'Peso Mexicano' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
  ])
  const criptomonedas = ref([])
  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  })
  const cargando = ref(false)
  const cotizacion = ref({})

  onMounted(async () => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const resultado = await fetch(url)
    const { Data } = await resultado.json()
    criptomonedas.value = Data
  })

  const obtenerResultados = async () => {
    cargando.value = true
    cotizacion.value = {}
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cotizar.criptomoneda}&tsyms=${cotizar.moneda}`
    const resultado = await fetch(url)
    const data = await resultado.json()
    cotizacion.value = data.DISPLAY[cotizar.criptomoneda][cotizar.moneda]
    cargando.value = false
    console.log(cotizacion.value)
  }

  const mostrarResultado = computed(() => {
    return Object.values(cotizacion.value).length >  0
  })

  return {
    monedas,
    criptomonedas,
    cotizar,
    mostrarResultado,
    obtenerResultados,
    cotizacion,
    cargando
  }
}

export default useCripto