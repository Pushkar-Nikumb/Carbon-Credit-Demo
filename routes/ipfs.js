const router = require('express').Router();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();
const Organization = require('../model/organization');

const uploadToIPFS = async (body, req, res) => {
    const formData = new FormData();
    const src = body.path;

    const file = fs.createReadStream(src);
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
        name: body.fileName,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
        const ipfsResponse = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    "Authorization": `Bearer ${process.env.JWT}`
                    
                },
            }
        );

        console.log(ipfsResponse.data);

        // You might want to send a response back to the client indicating success
        res.status(200).json({
            success: true,
            message: "Image uploaded to Pinata IPFS successfully.",
            ipfsResponse: ipfsResponse.data,
        });
    } catch (error) {
        console.error(error);

        // Handle the error and send an appropriate response to the client
        res.status(500).json({
            success: false,
            message: "Error uploading image to Pinata IPFS.",
            error: error.message,
        });
    }
};

router.post('/ipfs', async (req, res) => {
    console.log(req.body);

    if (!req.body) {
        res.status(400).json({ success: false, message: "Data not received from the client!" });
    }

    try {
        const orgDataExists = await Organization.findOne({
            _id: req.body.organizationalID,
        });

        if (orgDataExists) {
            console.log('in try block');
            uploadToIPFS(req.body, req, res);
        } else {
            res.status(404).json({ success: false, message: "Organization not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
