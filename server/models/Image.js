import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "Please provide image URL"],
        match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
    },
    prompt: {
        type: String,
        required: [true, "Please provide a prompt"],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model('Image', ImageSchema)
