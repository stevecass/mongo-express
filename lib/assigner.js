module.exports = {
  setObjectFieldsFromParams : function(obj, params) {
    for (var k in obj.schema.paths) {
      if (params[k]) {
        obj[k] = params[k];
      }
    }
  }
};