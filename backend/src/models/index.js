const Task = require('./Task');
const Application = require('./Application');
const SupportType = require('./SupportType');


Application.hasMany(Task, { foreignKey: 'application_id' });
Task.belongsTo(Application, { foreignKey: 'application_id' });


SupportType.hasMany(Task, { foreignKey: 'support_type_id' });
Task.belongsTo(SupportType, { foreignKey: 'support_type_id' });


module.exports = { Task, Application, SupportType };