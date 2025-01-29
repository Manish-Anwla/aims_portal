import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    email_type: {
        type: String,
        require: false,
    },
});

const Email = mongoose.model('login_email', EmailSchema);
export default Email;