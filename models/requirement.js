const Sequelize = require('sequelize');

module.exports = class Requirement extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      requirementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      check_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Requirement',
      tableName: 'Requirement',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.Requirement.belongsTo(db.User, {foreignKey: 'userId', targetKey: 'id'});
  };
};