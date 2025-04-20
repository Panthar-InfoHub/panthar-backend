const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillsArray: {
        type: [String],
        required: true,
        default: []
    }
}, { timestamps: true });

skillSchema.statics.getSkillsDocument = async function () {
    let doc = await this.findOne();
    if (!doc) {
        doc = await this.create({ skillsArray: [] });
    }
    return doc;
};

module.exports = mongoose.model('Skill', skillSchema);
