import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const existinguser = await User.findOne({ email })

    if (!existinguser) {
      res.status(404).json({ message: 'User Does not Exist' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, existinguser.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ messgae: 'Wrong Username and Password combination' })
    }

    const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ result: existinguser, token })
  } catch (error) {
    res.status(500).json({ message: 'Uhh oh, something went wrong' })
    console.log(error)
  }
}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body

  try {
    const existinguser = await User.findOne({ email })

    if (existinguser) {
      res.status(400).json({ message: 'User Already Exists' })
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` })

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({ result, token })
  } catch {
    res.status(500).json({ message: 'Uhh oh, something went wrong' })
  }
}
