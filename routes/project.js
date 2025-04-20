const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const { name, description, liveLink, githubLink, technologies } = req.body;

        const project = new Project({
            name,
            description,
            liveLink,
            githubLink,
            technologies
        });

        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { name, description, liveLink, githubLink, technologies } = req.body;

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { name, description, liveLink, githubLink, technologies },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;