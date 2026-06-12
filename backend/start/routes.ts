import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // Autenticação
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    // Conta do usuário autenticado
    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('account')
      .use(middleware.auth())

    // CRUD de usuários
    router
      .group(() => {
        router.get('/', '#controllers/users_controller.index')
        router.put('/:id', '#controllers/users_controller.update')
        router.delete('/:id', '#controllers/users_controller.destroy')
      })
      .prefix('users')
      .as('users')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
