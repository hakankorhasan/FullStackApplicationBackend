
module.exports = {
  friendlyName: 'Uploadfile',
  description: 'Uploadfile something.',

  inputs: {
    file: {
      type: 'ref',
      description: "the file ı want "
    }
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs, exits) {
    const file = inputs.file
    
    const options =
      { 
        adapter: require('skipper-better-s3')
      , key: 'AKIA27IT5WRH35R67A5C'
      , secret: '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'
      , bucket: 'fullstack-bucket-image'
      , s3params: { ACL: ' public-read'}
      }

      file.upload(options, async (err, files) => {
        if (err) { return res.serverError(err.toString())}

        if (files && files.length > 0 && files[0].extra && files[0].extra.Location) {
          const fileUrl = files[0].extra.Location;
          // işlemlere devam et
        } else {
          console.log("Dosya bilgileri alınamadı.");
        }

        const fileUrl = files[0].extra.Location     
        return exits.success(fileUrl)
      })

  }


};

