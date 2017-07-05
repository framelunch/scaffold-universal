const { DOMAIN } = process.env;

export default ({ email, name, token }) => ({
  to: email,
  subject: 'Do you need to change your password ?',
  text: `Hi ${name}

  Please click the link below to confirm your email address.
  
  ${DOMAIN}/auth/local/${token}/?type=resetPwd
  
  Team`,
});
