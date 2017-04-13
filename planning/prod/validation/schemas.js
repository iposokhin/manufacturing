let typicalOperationSchema = {
  'name': {
    notEmpty: true,
    errorMessage: 'can\'t be blank'
  },
  'duration': {
    notEmpty: true,
    errorMessage: 'can\'t be blank'
  }
};

let machinesSchema = {
  'name': {
    notEmpty: true,
    errorMessage: 'can\'t be blank'
  },

  'inventaryNumber': {
    notEmpty: true,
    errorMessage: 'can\'t be blank'
  },

  availableOperations: {

  }
}

const validation = {
  typicalOperationSchema,
  machinesSchema
};

module.exports = validation;