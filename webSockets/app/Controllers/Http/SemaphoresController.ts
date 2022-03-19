import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ws from 'App/Services/Ws'

export default class SemaphoresController {
  public async show({ params }: HttpContextContract) {
    Ws.io.emit('news', { place: params.id, timer: params.id === 'Timon' ? 600 : 120 })
  }
}
