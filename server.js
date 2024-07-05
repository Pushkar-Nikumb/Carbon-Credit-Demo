const express = require('express');
const cors = require('cors')
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(cors({origin: true}))//request from client side 
app.use(bodyParser.json())//bosy parser
const PORT = 4000
//user Authentications
const userRoute = require('./routes/user');
const formRoute = require('./routes/organization')
const addAuditoRoute = require('./routes/auditor') 
const fetchAuditorRoute = require('./routes/fetchAuditor')
const refAuditorRoute = require('./routes/refAuditor')
const refDocumentRoute = require('./routes/docUpload')
const refTargetRoute = require('./routes/target')
const refMintCertificateRoute = require('./routes/certificate')
const refUploadToIPFSRoute = require('./routes/ipfs')
const fetchOrganizationDataRoute = require('./routes/fetchorganizations')
const fetchIndividualOrganizationDataRoute = require('./routes/fetchOrgIndividual')

//user Login
app.use('/api/users',userRoute)
//Organizational Data Insertion
app.use('/api/organization',formRoute)
//Auditor 
app.use('/api/add_auditor',addAuditoRoute)
app.use('/api/fetch_auditor',fetchAuditorRoute)
app.use('/api/referenceAuditor',refAuditorRoute)
//Document
app.use('/api/document',refDocumentRoute)
//Target
app.use('/api/setTarget',refTargetRoute)
//Mint Certificate
app.use('/api/ethereum',refMintCertificateRoute)
//upload to IPFS
app.use('/api/uploadToIPFS',refUploadToIPFSRoute)
//fetch all the data from OrganizATION schema
app.use('/api/organization',fetchOrganizationDataRoute)
//fetch individual Organzational Data
app.use('/api/organization',fetchIndividualOrganizationDataRoute)
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_STRING,()=>{
  console.log("mongoose connected")
})
 
app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
})