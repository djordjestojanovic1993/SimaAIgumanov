const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title:{
        type:String,
        required: true,
        default: "Naslov"
    },
    text:{
        type:String,
        required: true,
        default: "Text"
    },
    date:{
        type:String,
        default: ""
    },
    type:{
        type:String,
        required: true,
        default: "Vrsta"
    },
    img:{
        type:String,
        default: "Slika"
    }
}, {collection: 'advertisements'})

const AdvertisementModel = mongoose.model('Advertisement', advertisementSchema);

const getAdvertisements = async function(){

    let advertisements = await AdvertisementModel.find().exec();
    if(advertisements.length > 0){
        return advertisements;
    }else{
        return null;
    }
}


const addAdvertisements = async function(advertisementData){
    let newAdvertisements = new AdvertisementModel({
        _id: new mongoose.Types.ObjectId(),
        title: advertisementData.title,
        text: advertisementData.text,
        date: advertisementData.date,
        type: advertisementData.type,
        img: advertisementData.slika
    });

    return newAdvertisements.save();
}

const deleteAdvertismentById = async function(id){
    try {
        const result = await AdvertisementModel.deleteOne({ _id: id });
        console.log(result);
        return result;
      } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
      }
}

const changeAdvertisement = async function(advertisementData){
    try {
        console.log(advertisementData.title)
        const dokument = await AdvertisementModel.findById(advertisementData.id);
        if (!dokument) {
            console.log('Dokument nije pronađen.');
            return;
          }
          dokument.title = advertisementData.title;
          dokument.text = advertisementData.text;
          dokument.date = advertisementData.date;

          await dokument.save();
          console.log('Podaci su uspešno promenjeni.');
      } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
      }
}

module.exports = {
    model : AdvertisementModel,
    getAdvertisements,
    addAdvertisements,
    deleteAdvertismentById,
    changeAdvertisement
}