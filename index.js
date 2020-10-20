const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const defaultOptions = {
  inc_field: '_id',
};
const Counter = {};
module.exports = function (counterType, connectionObj) {
  const connection = connectionObj || mongoose;
  const name = connectionObj ? connectionObj.name : 'default';
  if (!Counter[name]) {
    const CounterSchema = new Schema({
      _id: { type: String, required: true },
      seq: { type: Number, default: 0 }
    });
    Counter[name] = connection.model('counter', CounterSchema);
  }
  const CounterPlugin = function (schema, options) {
    const opts = Object.assign({}, defaultOptions, options);
    schema.add({
      _id: 'Number',
    });
    schema.pre('save', function(next) {
      let doc = this;
      Counter[name].findByIdAndUpdate({ _id: counterType }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc[opts.inc_field] = counter.seq;
        return next();
      });
    });
  }
  return CounterPlugin;
}