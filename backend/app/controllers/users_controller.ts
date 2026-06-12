import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({}: HttpContext) {
    return await User.query().select(['id', 'email', 'createdAt'])
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'Usuário não encontrado',
      })
    }

    const email = request.input('email')
    const password = request.input('password')

    if (email) {
      user.email = email
    }

    if (password) {
      user.password = password
    }

    await user.save()

    return {
      message: 'Usuário atualizado com sucesso',
      user,
    }
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'Usuário não encontrado',
      })
    }

    await user.delete()

    return response.ok({
      message: 'Usuário removido com sucesso',
    })
  }
}
