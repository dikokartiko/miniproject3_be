"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Indomie Goreng",
          image: null,
          price: 3000,
          description:
            "Indomie Goreng adalah varian mie instan yang paling terkenal dari Indomie. Mi Goreng memiliki rasa yang gurih dan sedikit pedas, dan disajikan dengan bumbu khusus berupa bumbu saus, minyak goreng, dan bumbu pelengkap seperti bawang goreng. Biasanya dimasak dengan cara digoreng dan sering dijadikan camilan atau makanan cepat saji.",
          categoryId: 1,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Indomie Rasa Ayam Bawang",
          image: null,
          price: 19.99,
          description:
            "Indomie Rasa Ayam Bawang memiliki rasa ayam yang lezat dan aroma bawang yang khas. Mie instan ini disajikan dengan bumbu berupa bubuk rasa ayam, minyak bawang, dan bawang goreng. Rasanya yang enak dan praktis dalam penyajiannya menjadikannya pilihan favorit banyak orang.",
          categoryId: 1,
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
