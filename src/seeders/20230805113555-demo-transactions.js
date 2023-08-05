'use strict';

module.exports = {
  up:async(queryInterface,Sequelize)=>{
    await queryInterface.bulkInsert('Transactions',[
     {cashierId :1,date:new Date(),totalPrice :20.0,createdAt:new Date(),updatedAt:new Date()},
     {cashierId :2,date:new Date(),totalPrice :30.0,createdAt:new Date(),updatedAt:new Date()},
     {cashierId :3,date:new Date(),totalPrice :40.0,createdAt:new Date(),updatedAt:new Date()}
    ],{});
  },

  down:async(queryInterface,Sequelize)=>{
    await queryInterface.bulkDelete('Transactions',null,{});
  }
};
