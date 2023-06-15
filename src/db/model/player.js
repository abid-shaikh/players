// ---------------------------------------------------------------------------------------------
// YOU CAN MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// YOU SHOULD NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// ---------------------------------------------------------------------------------------------

module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define("players", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    position: {
      type: Sequelize.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["defender", "midfielder", "forward"]],
      },
    },
  });

  return Player;
};
