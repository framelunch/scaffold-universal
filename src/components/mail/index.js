import { createTransport } from 'nodemailer';

import Activate from './template/activate';
import ForgotPass from './template/pass-forgot';
import ChangeEmail from './template/email-change';

const transport = createTransport({
  service: 'Gmail',
  auth: {
    user: 'flsystem@framelunch.jp',
    pass: 'framelunch1980',
  },
});

export function activate(body) {
  transport.sendMail(Activate(body), err => {
    if (err) {
      console.log(err);
    }
  });
}

export function forgotPwd(body) {
  transport.sendMail(ForgotPass(body), err => {
    if (err) {
      console.log(err);
    }
  });
}

export function changeEmail(body) {
  transport.sendMail(ChangeEmail(body), err => {
    if (err) {
      console.log(err);
    }
  });
}
