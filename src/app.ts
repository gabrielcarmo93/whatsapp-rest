import express, {Request, Response} from 'express';
import { send } from 'process';

import Sender from './sender'

const sender = new Sender()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
  const qr_code = sender.qr
  const connected = sender.isConnected

  if (qr_code) {
    const today = new Date()
    const moreFifteenSeconds = today.setDate(today.getSeconds() + 15)
    const generatedDateString = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    return res.send(`<img src="${qr_code.base64QrImg}" width='300' height='300' />
      <br />
      <span>Este QRCode foi gerado em ${generatedDateString} e tem duração de apenas 15 segundos</span>
      <br />
      <span>Este QRCode vai espirar em ${moreFifteenSeconds}</span>
    `)
  }
  return res.send({
    qr_code,
    connected
  })
})

app.post('/send', async (req: Request, res: Response) => {
  try {
    const { number, message } = req.body

    await sender.sendText(number, message)

    return res.status(200).json({})
  } catch (err) {
    return  res.status(500).send(err)
  }
})

app.post('/sendClause', async (req: Request, res: Response) => {
  try {
    const { number } = req.body

    await sender.sendClause(number)

    return res.status(200).json({})
  } catch (err) {
    return  res.status(500).send(err)
  }
})

app.listen(3000, () => console.log('server started'))