import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://cdn4.vectorstock.com/i/1000x1000/46/73/person-gray-photo-placeholder-man-material-design-vector-23804673.jpg',
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel', // Reference to the Channel model
    },
  },
  { timestamps: true }
);

// Encrypt password using bcryptjs
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Match user password with hashed password in db
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model('User', userSchema);

export default User;
