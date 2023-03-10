const mongoose = require('mongoose');
const insertTemplateData = require('../utils/injectSampleData');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
            trim: true,
        },
        // firebase issued UID
        uid: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: false,
            trim: true,
        },
        photoUrl: {
            type: String,
            required: false,
        },
        isAnonymous: {
            type: Boolean,
            required: true,
        },
        expireAt: {
            type: Date,
        },
    },
    { timestamps: true }
);
userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
userSchema.index({ uid: 1 }, { unique: true });


module.exports = mongoose.model('User', userSchema);
