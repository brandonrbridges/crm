import nodemailer from 'nodemailer'

const NotifyByEmail = (lead) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'brandon@visually.digital',
      pass: 'Digital123[]'
    }
  })

  let text = `Congratulations! You have received a new lead`
  text += `\n\n` 
  text += `Customer: ${lead.customer.name} (https://db.madisonavenue.se/customer/${lead.customer._id})` 
  text += `\nPhone: ${lead.customer.phone}` 
  text += `\nEmail: ${lead.customer.email}` 
  text += `\n` 
  text += `\nLead: https://db.madisonavenue.se/lead/${lead._id}` 
  text += `\nSource: ${lead.source}` 
  text += `\nType: ${lead.type}` 
  text += `\nCity: ${lead.city}` 
  text += `\nKvm: ${lead.kvm}` 
  text += `\n` 
  text += `\nMessage:` 
  text += `\n${lead.message}` 

  const email = {
    from: 'brandon@visually.digital',
    to: `info@${lead.source}`,
    subject: `Lead från ${lead.source}`,
    text: text
  }

  transporter.sendMail(email, (error, info) => {
    if(error) return console.error(error)
  })
}

export default NotifyByEmail