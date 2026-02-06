const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
        cloud_name: 'dum3ayegy', 
        api_key: '375138641984316', 
        api_secret: 'y7cB8liTWDshJRrr_ptWSZ7j05E' // Click 'View API Keys' above to copy your API secret
    });

const uploadImageCloudinary = async(filepath) =>{
   let res = await cloudinary.uploader.upload(filepath, {
    folder: "blog"
   })
}

module.exports = uploadImageCloudinary;