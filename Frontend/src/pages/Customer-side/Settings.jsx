import { useState } from 'react'
import { Pencil, User, Bell, MapPin, CreditCard, Globe, Shield, Lock, Trash2, ChevronRight } from 'lucide-react'
import CustomerDashboardLayout from '../../components/customer/CustomerDashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { updateMyProfile } from '../../services/userService'
import { changePassword } from '../../services/authService'
import person11 from '../../assets/images/person11.jpg'

const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#14532D]'

function DisabledRow({ icon: Icon, label }) {
    return (
        <div className="flex cursor-not-allowed items-center gap-3 py-3 opacity-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E3]">
                <Icon size={15} className="text-[#14532D]" />
            </div>
            <span className="flex-1 text-sm text-[#111827]">{label}</span>
            <span className="text-xs text-[#9CA3AF]">Coming soon</span>
        </div>
    )
}

function Settings() {
    const { user, updateUser } = useAuth()

    // Profile editing
    const [isEditing, setIsEditing] = useState(false)
    const [nameInput, setNameInput] = useState('')
    const [isSavingProfile, setIsSavingProfile] = useState(false)
    const [profileError, setProfileError] = useState('')
    const [profileMessage, setProfileMessage] = useState('')

    // Password change
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    const startEditing = () => {
        setNameInput(user.fullName)
        setProfileError('')
        setProfileMessage('')
        setIsEditing(true)
    }

    const handleSaveProfile = async () => {
        setProfileError('')

        if (!nameInput.trim()) {
            setProfileError('Name cannot be empty')
            return
        }

        setIsSavingProfile(true)
        try {
            const response = await updateMyProfile(nameInput.trim())
            updateUser({ ...user, fullName: response.data.fullName })
            setProfileMessage('Your name has been updated.')
            setIsEditing(false)
        }
        catch (error) {
            setProfileError(error.message)
        }
        finally {
            setIsSavingProfile(false)
        }
    }

    const handleChangePassword = async () => {
        setPasswordError('')
        setPasswordMessage('')

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('Please fill in all three fields')
            return
        }
        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters')
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match')
            return
        }

        setIsChangingPassword(true)
        try {
            await changePassword(currentPassword, newPassword)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setShowPasswordForm(false)
            setPasswordMessage('Your password has been changed.')
        }
        catch (error) {
            setPasswordError(error.message)
        }
        finally {
            setIsChangingPassword(false)
        }
    }

    return (
        <CustomerDashboardLayout userPhoto={person11}>
            <h1 className="font-heading text-3xl font-bold text-[#14532D]">Settings</h1>
            <p className="mt-1 text-sm text-[#4B5563]">Manage your account and preferences.</p>

            {/* Profile */}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-[#111827]">Profile</h2>
                        <p className="text-sm text-[#4B5563]">Update your personal information</p>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={startEditing}
                            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#111827]"
                        >
                            <Pencil size={14} /> Edit Profile
                        </button>
                    )}
                </div>

                {profileMessage && (
                    <div className="mt-3 rounded-lg bg-[#E7F0E3] px-3 py-2 text-sm text-[#14532D]">{profileMessage}</div>
                )}

                <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F0E3] text-xl font-bold text-[#14532D]">
                        {user?.fullName?.charAt(0).toUpperCase()}
                    </div>

                    {isEditing ? (
                        <div className="flex-1 space-y-3">
                            {profileError && (
                                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{profileError}</div>
                            )}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Full name</label>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-[#111827]">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className={`${inputClass} bg-gray-50 text-gray-400`}
                                />
                                <p className="mt-1 text-xs text-[#9CA3AF]">Your email can't be changed here.</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={isSavingProfile}
                                    className="rounded-lg bg-[#14532D] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                                >
                                    {isSavingProfile ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-[#111827]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm font-semibold text-[#111827]">{user?.fullName}</p>
                            <p className="text-xs text-[#4B5563]">{user?.email}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                {/* Account */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h2 className="font-semibold text-[#111827]">Account</h2>
                    <p className="text-sm text-[#4B5563]">Manage your account information</p>

                    <div className="mt-3 divide-y divide-gray-50">
                        <DisabledRow icon={User} label="Personal Information" />
                        <DisabledRow icon={Bell} label="Notifications" />
                        <DisabledRow icon={MapPin} label="Saved Address" />
                        <DisabledRow icon={CreditCard} label="Payment Methods" />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Preferences */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Preferences</h2>
                        <p className="text-sm text-[#4B5563]">Customize your experience</p>

                        <div className="mt-3 divide-y divide-gray-50">
                            <DisabledRow icon={Globe} label="Language" />
                            <DisabledRow icon={Bell} label="Notifications" />
                        </div>
                    </div>

                    {/* Security */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <h2 className="font-semibold text-[#111827]">Security</h2>
                        <p className="text-sm text-[#4B5563]">Keep your account safe and secure</p>

                        {passwordMessage && (
                            <div className="mt-3 rounded-lg bg-[#E7F0E3] px-3 py-2 text-sm text-[#14532D]">{passwordMessage}</div>
                        )}

                        <div className="mt-3">
                            <button
                                onClick={() => {
                                    setShowPasswordForm((prev) => !prev)
                                    setPasswordError('')
                                    setPasswordMessage('')
                                }}
                                className="flex w-full items-center gap-3 py-3 text-left"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E3]">
                                    <Shield size={15} className="text-[#14532D]" />
                                </div>
                                <span className="flex-1 text-sm text-[#111827]">Change Password</span>
                                <ChevronRight
                                    size={16}
                                    className={`text-gray-400 transition-transform ${showPasswordForm ? 'rotate-90' : ''}`}
                                />
                            </button>

                            {showPasswordForm && (
                                <div className="space-y-3 pb-3">
                                    {passwordError && (
                                        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{passwordError}</div>
                                    )}
                                    <input
                                        type="password"
                                        placeholder="Current password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className={inputClass}
                                    />
                                    <input
                                        type="password"
                                        placeholder="New password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={inputClass}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={inputClass}
                                    />
                                    <button
                                        onClick={handleChangePassword}
                                        disabled={isChangingPassword}
                                        className="w-full rounded-lg bg-[#14532D] py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                                    >
                                        {isChangingPassword ? 'Changing...' : 'Change password'}
                                    </button>
                                </div>
                            )}

                            <div className="border-t border-gray-50">
                                <DisabledRow icon={Lock} label="Two-Factor Authentication" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger zone */}
            <div className="mt-6 flex cursor-not-allowed items-center justify-between rounded-2xl border border-red-100 bg-red-50 p-5 opacity-60">
                <div className="flex items-center gap-3">
                    <Trash2 size={18} className="text-red-600" />
                    <div>
                        <p className="text-sm font-semibold text-red-600">Danger Zone</p>
                        <p className="text-xs text-red-400">Deleting your account isn't available yet</p>
                    </div>
                </div>
                <span className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600">
                    Delete Account
                </span>
            </div>
        </CustomerDashboardLayout>
    )
}

export default Settings