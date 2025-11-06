const generateAIResponse = require('../services/ai.services')


module.exports.getReview = async (req, res) => {
    try {
        const prompt = req.body.code;

        if (!prompt) {
            return res.status(400).json({ error: 'Code parameter is required in request body' });
        }

        const response = await generateAIResponse(prompt);
        res.json({ review: response });
    } catch (error) {
        console.error('Error in getReview:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}