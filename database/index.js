const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner');

const Place = db.define('place', {
	address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING(2)
  },
  phone: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
})


const Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 1
    }
  },
  amenities: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeValidate: function(hotel) {
      var amenities = hotel.amenities.split(", ")
      for(let type of amenities) {
        type = type.trim();
      }
      hotel.amenities = amenities.join(", ");
    }
  }
})

const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING
  },
  age_range: {
    type: Sequelize.STRING
  },
})

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING
  },
  cuisine: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 1
    }
  }
}, {
  hooks: {
    beforeValidate: function(restaurant) {
      var cuisine = restaurant.cuisine.split(", ")
      for(let type of cuisine) {
        console.log(type)
        type = type.trim();
      }
      restaurant.cuisine = cuisine.join(", ");
    }
  }
})

//associations
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);
Hotel.belongsTo(Place);



db.Place = Place;
db.Hotel = Hotel;
db.Activity = Activity;
db.Restaurant = Restaurant;

module.exports = db

//exporting {db: db} doesn't work to sync


