# mongoose-plugin-counter
mongoose 自增 id 插件

## 使用方式

```js
// egg/model/user.jhs
const mongoose = require('mongoose');
const counter = require('@bz/mongoose-plugin-counter');

const Schema = mongoose.Schema;
module.exports = (app) => {
  const UserSchema = new Schema({
    nickname: String,
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true },
    flg_deleted: { type: Boolean, default: false },
  });
  const connection = app.mongooseDB.get('default') || mongoose;
  // 改 _id 为自增 id
  UserSchema.plugin(counter('user', connection));
  return connection.model('user', UserSchema);
};
```

## 参数

```js
function (type, connection) {}
```

第一个参数是类型，同表名一致即可
第二个参数是`connection`, 默认使用 `mongoose`