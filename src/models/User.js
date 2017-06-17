import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;
const authTypes = ['twitter', 'facebook', 'google'];

const UserSchema = new Schema({
  name: { type: String, default: 'No Name', required: true, maxlength: 20 },
  email: { type: String, lowercase: true },
  emailActivate: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {},

  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set((password) => {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(() => this._password);

UserSchema
  .virtual('me')
  .get(() => ({
    _id: this._id,
    name: this.name,
    role: this.role,
  }));

UserSchema
  .virtual('token')
  .get(() => ({
    _id: this._id,
    role: this.role,
  }));

/**
 * Validations
 */

// Validate empty name
UserSchema
  .path('name')
  .validate((name) => {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return name.length;
  }, 'Name cannot be blank');

UserSchema
  .path('email')
  .validate((email) => {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate({
    isAsync: true,
    validator(value, respond) {
      const self = this;
      this.constructor.findOne({ email: value }, (err, user) => {
        if (err) throw err;
        if (user) {
          if (self.id === user.id) return respond(true);
          return respond(false);
        }
        respond(true);
      });
    },
    message: 'The specified email address is already in use.',
  });

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate((hashedPassword) => {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

const validatePresenceOf = value => value && value.length;

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', (next) => {
    if (!this.isNew) {
      next();
    } else if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1) {
      next(new Error('Invalid password'));
    } else {
      next();
    }
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword(password) {
    if (!password || !this.salt) return '';
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
  },
};

export default mongoose.model('User', UserSchema);
