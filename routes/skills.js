const express = require('express');
const router = express.Router();
const Skill = require('../models/skills');


const cleanSkills = (skills) => {
    return [...new Set(
        skills
            .filter(s => typeof s === 'string')
            .map(s => s.trim())
            .filter(s => s.length > 0)
    )];
};


router.get('/', async (req, res) => {
    try {
        const doc = await Skill.getSkillsDocument();
        res.json({ skills: doc.skillsArray });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const { skills } = req.body;
        if (!Array.isArray(skills)) {
            return res.status(400).json({ error: 'Skills must be an array' });
        }

        const newSkills = cleanSkills(skills);
        if (newSkills.length === 0) {
            return res.status(400).json({ error: 'No valid skills provided' });
        }

        const doc = await Skill.getSkillsDocument();
        const combined = cleanSkills([...doc.skillsArray, ...newSkills]);
        const addedCount = combined.length - doc.skillsArray.length;

        doc.skillsArray = combined;
        await doc.save();

        res.status(201).json({
            success: true,
            added: addedCount,
            skills: doc.skillsArray
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/', async (req, res) => {
    try {
        const { skills } = req.body;
        if (!Array.isArray(skills)) {
            return res.status(400).json({ error: 'Skills must be an array' });
        }

        const cleaned = cleanSkills(skills);
        const doc = await Skill.getSkillsDocument();

        doc.skillsArray = cleaned;
        await doc.save();

        res.json({
            success: true,
            message: 'Skills replaced successfully',
            skills: doc.skillsArray
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/', async (req, res) => {
    try {
        const { skills } = req.body;
        if (!Array.isArray(skills)) {
            return res.status(400).json({ error: 'Skills must be an array' });
        }

        const toRemove = cleanSkills(skills);
        const doc = await Skill.getSkillsDocument();

        const before = doc.skillsArray.length;
        doc.skillsArray = doc.skillsArray.filter(s => !toRemove.includes(s));
        const removed = before - doc.skillsArray.length;

        await doc.save();

        res.json({
            success: true,
            removed,
            skills: doc.skillsArray
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
