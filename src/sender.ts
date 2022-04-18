import { parsePhoneNumber, isValidNumber, } from 'libphonenumber-js'

import { create, Whatsapp, Message, SocketState } from 'venom-bot'

export type QRCode = {
  base64QrImg: string
  asciiQr: string
  attempts: number
  urlCode?: string
}

class Sender {
  private client: Whatsapp
  private receiverSuffix: string ="@c.us"
  private connected: boolean = false;
  private qrCode: QRCode

  constructor() {
    this.initialize()
  }

  private initialize() {
    const qrCode = (base64QrImg: string, asciiQr: string, attempts: number, urlCode?: string ) => {
      this.qrCode = { base64QrImg :base64QrImg, asciiQr, attempts, urlCode }
    }

    const status = (statusSession: string) => {
      const on = ['isLogged', 'qrReadSuccess', 'chatsAvailable']

      this.connected = on.includes(statusSession)
    }

    const start = (client: Whatsapp) => {
      this.client = client

      this.client.onStateChange((state) => {
        console.log({state})
        this.connected = state === SocketState.CONNECTED
      })
    }

    create('push-notification', qrCode, status)
      .then((client) => start(client))
      .catch(console.error)
  }

  get qr(): QRCode {
    return this.qrCode
  }

  get isConnected(): boolean {
    return this.connected
  }

  async sendText(to: string, body: string) {
    if (!isValidNumber(to, "BR")) {
      throw new Error("Invalid phone number")
    }
    
    var phoneNumber = parsePhoneNumber(to, "BR").format('E.164').replace('+', '')

    phoneNumber = phoneNumber.includes(this.receiverSuffix)
      ? phoneNumber
      : `${phoneNumber}${this.receiverSuffix}`

    const send = await this.client.sendText(phoneNumber, body)
    
    return send
  }

  async sendClause(to: string) {
    if (!isValidNumber(to, "BR")) {
      throw new Error("Invalid phone number")
    }
    
    var phoneNumber = parsePhoneNumber(to, "BR").format('E.164').replace('+', '')

    phoneNumber = phoneNumber.includes(this.receiverSuffix)
      ? phoneNumber
      : `${phoneNumber}${this.receiverSuffix}`

    const send = await this.client.sendFile(phoneNumber, './src/assets/clausula_garantti.doc', 'Clausula Garantti', 'text/plain')
    
    return send
  }
}


export default Sender