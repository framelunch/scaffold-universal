const { DOMAIN } = process.env;

export default ({ email, name, token }) => ({
  to: email,
  subject: 'Please confirm your email address.',
  text: `Hi ${name}

  Thanks for signing up.
  Please click the link below to confirm your email address.
  
  ${DOMAIN}/auth/local/${token}/?type=changeEmail
  
  Team`,
});
