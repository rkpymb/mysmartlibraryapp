import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}TestSeries/UpdateTSoptions`, { token: process.env.MYKEY, title: req.body.title, details: req.body.details, isActive: req.body.isActive, id: req.body.id }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}