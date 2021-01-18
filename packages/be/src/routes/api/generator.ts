import validateGeneratorInput from '../../validation/generator';

export default app => {
    // @route GET api/generator/heltz
    // @desc heartbeat
    // @access Public
    app.get('/api/generator/heltz', (req, res) => {
        res.status(200).json({
            msg: 'Number generator is working',
            success: true,
            headers: req.headers,
        });
    });

    // @route GET api/generator
    // @desc generate number in provided range
    // @access Public
    app.post('/api/generator', (req, res) => {
        const { errors, isValid } = validateGeneratorInput(req.body);

        if (!isValid) {
            return res.status(400).json({success: false, ...errors});
        }

        const {min, max} = req.body;
        res.status(200).json({
            success: true,
            msg: Math.floor(Math.random() * (+max - +min + 1)) + +min
        });
    });
}
