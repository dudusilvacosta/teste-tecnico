<template>
  <q-page class="q-pa-md">

    <q-card>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Usuários</div>

        <q-btn label="Recarregar" icon="refresh" flat @click="loadUsers" :loading="loading" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-table :rows="users" :columns="columns" row-key="id" flat bordered :loading="loading"
          no-data-label="Nenhum usuário encontrado">

          <!-- AÇÕES -->
          <template #body-cell-actions="props">
            <q-td :props="props" class="q-gutter-sm">

              <q-btn icon="edit" flat dense color="primary" @click="editUser(props.row)" />

              <q-btn icon="delete" flat dense color="negative" @click="confirmDelete(props.row)" />

            </q-td>
          </template>

        </q-table>
      </q-card-section>
    </q-card>

    <!-- DIALOG DELETE -->
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="text-h6">
          Confirmar exclusão?
        </q-card-section>

        <q-card-section>
          Tem certeza que deseja excluir este usuário?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="negative" label="Excluir" @click="deleteUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DIALOG EDIT -->
    <q-dialog v-model="editDialog">
      <q-card style="min-width: 400px">

        <q-card-section class="text-h6">
          Editar usuário
        </q-card-section>

        <q-card-section>

          <q-input v-model="selectedUser.email" label="E-mail" type="email" outlined class="q-mb-md" />

          <q-input v-model="selectedUser.password" label="Nova senha (opcional)" type="password" outlined />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Salvar" @click="updateUser" />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import type { AxiosError } from 'axios'

interface User {
  id: number
  email: string
}

const $q = useQuasar()

const users = ref<User[]>([])
const loading = ref(false)

const deleteDialog = ref(false)
const editDialog = ref(false)

const userToDelete = ref<number | null>(null)

const selectedUser = ref({
  id: 0,
  email: '',
  password: '',
})

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' as const },
  { name: 'email', label: 'E-mail', field: 'email', align: 'left' as const },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'right' as const },
]

const loadUsers = async () => {
  loading.value = true

  try {
    const { data } = await api.get<User[]>('/users')
    users.value = data
  } catch (err) {
    const error = err as AxiosError<{ message: string }>

    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Erro ao carregar usuários',
    })
  } finally {
    loading.value = false
  }
}

const editUser = (user: User) => {
  selectedUser.value = {
    id: user.id,
    email: user.email,
    password: '',
  }

  editDialog.value = true
}

const updateUser = async () => {
  try {
    const payload: { email: string; password?: string } = {
      email: selectedUser.value.email,
    }

    if (selectedUser.value.password) {
      payload.password = selectedUser.value.password
    }

    await api.put(`/users/${selectedUser.value.id}`, payload)

    $q.notify({
      type: 'positive',
      message: 'Usuário atualizado com sucesso',
    })

    editDialog.value = false
    await loadUsers()
  } catch (err) {
    const error = err as AxiosError<{ message: string }>

    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Erro ao atualizar usuário',
    })
  }
}

const confirmDelete = (user: User) => {
  userToDelete.value = user.id
  deleteDialog.value = true
}

const deleteUser = async () => {
  if (!userToDelete.value) return

  try {
    await api.delete(`/users/${userToDelete.value}`)

    $q.notify({
      type: 'positive',
      message: 'Usuário excluído com sucesso',
    })

    deleteDialog.value = false
    userToDelete.value = null

    await loadUsers()
  } catch (err) {
    const error = err as AxiosError<{ message: string }>

    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Erro ao excluir usuário',
    })
  }
}

onMounted(() => {
  void loadUsers()
})
</script>
