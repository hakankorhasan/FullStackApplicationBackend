module.exports = {
    attributes: {
        id: {
            type: 'number',
             autoIncrement: true
        },

        from: {
            model: 'user',
             required: true
        },

        to: {
            model: 'user',
             required:true
        },
        
        message: {
            type: 'string',
             required: true
        },

        read: {
            type: 'boolean',
             defaultsTo: false
        },
    }
}