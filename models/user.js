const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isSubscribed: {
        type: Boolean,
        default: false,
        required: false
    },
    email: { 
        type: String,
        required: true, 
        unique: true,   
        lowercase: true,  
        trim: true,      
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    watchHistory: [{ 
        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content' 
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    likedContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],
}, { timestamps: true });


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw err;
    }
};

module.exports = mongoose.model('User', userSchema);