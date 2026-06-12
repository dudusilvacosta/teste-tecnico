<template>
  <div class="row justify-center q-mt-xl">
    <div class="col-12 col-md-4">

      <q-card>
        <q-card-section>
          <div class="text-h5 text-center">
            Login
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit">

            <q-input v-model="email" label="E-mail" type="email" outlined class="q-mb-md" :rules="[
              val => !!val || 'Informe o e-mail'
            ]" />

            <q-input v-model="password" label="Senha" type="password" outlined class="q-mb-md" :rules="[
              val => !!val || 'Informe a senha'
            ]" />

            <q-btn label="Entrar" type="submit" color="primary" class="full-width" :loading="loading"
              :disable="loading" />

            <q-btn label="Criar conta" flat color="primary" class="full-width q-mt-sm" @click="goToRegister" />

          </q-form>
        </q-card-section>
      </q-card>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
import type { AxiosError } from 'axios'

const router = useRouter()
const $q = useQuasar()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const goToRegister = () => {
  void router.push('/register')
}

const onSubmit = async () => {
  if (loading.value) return

  loading.value = true

  try {
    await auth.login({
      email: email.value,
      password: password.value,
    })

    $q.notify({
      type: 'positive',
      message: 'Login realizado com sucesso',
    })

    await router.push('/')
  } catch (err) {
    const error = err as AxiosError<{ message: string }>

    const message =
      error.response?.data?.message ||
      'E-mail ou senha inválidos'

    $q.notify({
      type: 'negative',
      message,
    })
  } finally {
    loading.value = false
  }
}
</script>
