import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['sales', 'inventory', 'clients', 'cash'], // ← Agregué 'cash' que usas en frontend
        required: true
    },
    startDate: Date,
    endDate: Date,
    include: {
        totals: { type: Boolean, default: true },
        details: { type: Boolean, default: false },
        charts: { type: Boolean, default: false }
    },
    format: {
        type: String,
        enum: ['pdf', 'excel', 'csv'],
        default: 'pdf'
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    generatedData: mongoose.Schema.Types.Mixed,
    downloadUrl: String,
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, // ← ¡IMPORTANTE!
        default: null
    }
}, { 
    timestamps: true 
});

export default mongoose.model('Report', schema);
