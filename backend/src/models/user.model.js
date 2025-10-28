import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["cashier", "employee", "admin"],
      default: "employee",
    },
    email: {
      type: String,
      unique: true,
    },
    telephone: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// hashear contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// metodo para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//generar jwt
userSchema.methods.generateAuthToken = function () {
  // console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);
  // console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const payload = {
    userId: this._id,
    username: this.username,
    role: this.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default mongoose.model("User", userSchema);
