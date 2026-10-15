
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { sendEmail } from "../utils/sendEmail.js";

const generateToken = (userId) =>
    jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN || "1d",
    });

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// SIGN UP
export const signUp = async (req, res, next) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password || !role) {
            throw createError(
                "Full name, email, password and role are required",
                400
            );
        }

        // Validate the password BEFORE hashing it.
        if (password.length < 6) {
            throw createError(
                "Password must be at least 6 characters",
                400
            );
        }

        // Only permit the roles defined by your application.
        if (!["restaurant", "customer"].includes(role)) {
            throw createError("Invalid user role", 400);
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw createError("User with this email already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a six-digit email verification code.
        const verificationCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const verificationCodeExpiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            verificationCode,
            verificationCodeExpiresAt,
        });

        try {
            await sendEmail({
                to: newUser.email,
                subject: "Verify your PlateForm account",
                html: `
                    <p>Hi ${newUser.fullName},</p>
                    <p>Your PlateForm verification code is:</p>
                    <h2>${verificationCode}</h2>
                    <p>This code expires in 10 minutes.</p>
                `,
            });
        } catch (emailError) {
            // The account has already been created.
            // Log the delivery failure so it can be investigated.
            console.error(
                "Failed to send verification email:",
                emailError.message
            );
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// SIGN IN
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw createError("Email and password are required", 400);
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw createError("Invalid credentials", 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw createError("Invalid credentials", 401);
        }

        // Do not allow login before email verification.
        if (!user.isVerified) {
            throw createError("Please verify your email before logging in", 403);
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

// SIGN OUT
export const signOut = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "User signed out successfully",
        });
    } catch (error) {
        next(error);
    }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res, next) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            throw createError("Email and code are required", 400);
        }

        const user = await User.findOne({ email }).select(
            "+verificationCode +verificationCodeExpiresAt"
        );

        if (!user) {
            throw createError("User not found", 404);
        }

        if (user.isVerified) {
            return res.status(200).json({
                success: true,
                message: "Email is already verified",
            });
        }

        if (
            !user.verificationCode ||
            user.verificationCode !== String(code)
        ) {
            throw createError("Invalid verification code", 400);
        }

        if (
            !user.verificationCodeExpiresAt ||
            user.verificationCodeExpiresAt < new Date()
        ) {
            throw createError(
                "Verification code has expired. Please request a new one.",
                400
            );
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiresAt = undefined;

        await user.save();

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            data: {
                token,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

// RESEND VERIFICATION CODE
export const resendVerificationCode = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw createError("Email is required", 400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw createError("User not found", 404);
        }

        if (user.isVerified) {
            return res.status(200).json({
                success: true,
                message: "Email is already verified",
            });
        }

        const verificationCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const verificationCodeExpiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        user.verificationCode = verificationCode;
        user.verificationCodeExpiresAt = verificationCodeExpiresAt;

        await user.save();

        await sendEmail({
            to: user.email,
            subject: "Your new PlateForm verification code",
            html: `
                <p>Your new verification code is:</p>
                <h2>${verificationCode}</h2>
                <p>This code expires in 10 minutes.</p>
            `,
        });

        return res.status(200).json({
            success: true,
            message: "A new verification code has been sent to your email",
        });
    } catch (error) {
        next(error);
    }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw createError("Email is required", 400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw createError("No account found with this email", 404);
        }

        const resetPasswordCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const resetPasswordCodeExpiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        user.resetPasswordCode = resetPasswordCode;
        user.resetPasswordCodeExpiresAt = resetPasswordCodeExpiresAt;

        await user.save();

        await sendEmail({
            to: user.email,
            subject: "Reset your PlateForm password",
            html: `
                <p>Your password reset code is:</p>
                <h2>${resetPasswordCode}</h2>
                <p>This code expires in 10 minutes.
                If you didn't request this, you can ignore this email.</p>
            `,
        });

        return res.status(200).json({
            success: true,
            message: "A password reset code has been sent to your email",
        });
    } catch (error) {
        next(error);
    }
};

// RESET PASSWORD
export const resetPassword = async (req, res, next) => {
    try {
        const { email, code, newPassword } = req.body;

        if (!email || !code || !newPassword) {
            throw createError(
                "Email, code, and new password are required",
                400
            );
        }

        // Validate the plain-text password before hashing.
        if (newPassword.length < 6) {
            throw createError(
                "New password must be at least 6 characters",
                400
            );
        }

        const user = await User.findOne({ email }).select(
            "+resetPasswordCode +resetPasswordCodeExpiresAt"
        );

        if (!user) {
            throw createError("User not found", 404);
        }

        if (
            !user.resetPasswordCode ||
            user.resetPasswordCode !== String(code)
        ) {
            throw createError("Invalid reset code", 400);
        }

        if (
            !user.resetPasswordCodeExpiresAt ||
            user.resetPasswordCodeExpiresAt < new Date()
        ) {
            throw createError(
                "Reset code has expired. Please request a new one.",
                400
            );
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordCode = undefined;
        user.resetPasswordCodeExpiresAt = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully. You can now log in.",
        });
    } catch (error) {
        next(error);
    }
};

// CHANGE PASSWORD
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            throw createError(
                "Current password and new password are required",
                400
            );
        }

        if (newPassword.length < 6) {
            throw createError(
                "New password must be at least 6 characters",
                400
            );
        }

        const user = await User.findById(req.user?._id).select("+password");

        if (!user) {
            throw createError("User not found", 404);
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            throw createError("Current password is incorrect", 400);
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        next(error);
    }
};
