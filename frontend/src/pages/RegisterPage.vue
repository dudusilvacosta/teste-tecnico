<template>
  <div class="row justify-center q-mt-xl">
    <div class="col-12 col-md-4">

      <q-card>
        <q-card-section>
          <div class="text-h5 text-center">
            Registro
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit">

            <q-input v-model="email" label="E-mail" type="email" outlined class="q-mb-md" :rules="[
              val => !!val || 'Informe o e-mail'
            ]" />

            <q-input v-model="password" label="Senha" type="password" outlined class="q-mb-md" :rules="[
              val => !!val || 'Informe a senha',
              val => val.length >= 6 || 'Mínimo 6 caracteres'
            ]" />

            <q-input v-model="passwordConfirmation" label="Confirmar senha" type="password" outlined class="q-mb-md"
              :rules="[
                val => !!val || 'Confirme a senha',
                val => val === password || 'Senhas não coincidem'
              ]" />

            <q-btn label="Registrar" type="submit" color="primary" class="full-width" :loading="loading"
              :disable="loading" />

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
const passwordConfirmation = ref('')

const loading = ref(false)

const onSubmit = async () => {
  if (loading.value) return

  if (password.value !== passwordConfirmation.value) {
    $q.notify({
      type: 'negative',
      message: 'As senhas não conferem',
    })
    return
  }

  if (password.value.length < 6) {
    $q.notify({
      type: 'negative',
      message: 'A senha deve ter no mínimo 6 caracteres',
    })
    return
  }

  loading.value = true

  try {
    await auth.signup({
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })

    $q.notify({
      type: 'positive',
      message: 'Conta criada com sucesso!',
    })

    await router.push('/login')
  } catch (err) {
    const error = err as AxiosError<{ message: string }>

    const message =
      error.response?.data?.message ||
      'Erro ao criar conta'

    $q.notify({
      type: 'negative',
      message,
    })
  } finally {
    loading.value = false
  }
}
</script>
