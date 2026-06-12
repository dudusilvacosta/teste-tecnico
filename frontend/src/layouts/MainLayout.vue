<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Teste Eduardo
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm">
          <q-btn
            v-if="auth.isAuthenticated"
            flat
            dense
            icon="logout"
            label="Sair"
            color="negative"
            @click="logout"
          />

          <q-btn
            v-else
            flat
            dense
            icon="login"
            label="Login"
            to="/login"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'

const auth = useAuthStore()
const router = useRouter()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function logout() {
  auth.logout()
  await router.push('/login')
}

const linksList = computed<EssentialLinkProps[]>(() => {
  if (auth.isAuthenticated) {
    return [
      {
        title: 'Usuários',
        caption: 'listar usuários',
        icon: 'people',
        link: '/',
      },
    ]
  }

  return [
    {
      title: 'Register',
      caption: 'criar conta',
      icon: 'person_add',
      link: '/register',
    },
    {
      title: 'Login',
      caption: 'entrar',
      icon: 'login',
      link: '/login',
    },
  ]
})
</script>
