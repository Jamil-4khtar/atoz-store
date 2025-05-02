const categories = [
  {
    name: "Electronics",
    description: "All electronic devices and gadgets.",
    image: "/images/electronics.png",
    attrs: [
      {
        key: "Brand",
        value: ["Samsung", "Apple", "Sony", "LG"]
      },
      {
        key: "Screen Size",
        value: ["5 inch", "6 inch", "7 inch", "10 inch", "15 inch"]
      },
      {
        key: "Storage",
        value: ["128GB", "256GB", "512GB", "1TB"]
      }

    ]
  },
  {
    name: "Electronics/Computer",
    description: "All kinds of computers.",
    image: "/images/electronics.png",
    attrs: [
      {
        key: "Brand",
        value: ["Dell", "Apple", "Hp", "Asus"]
      },
      {
        key: "ROM",
        value: ["256GB", "512GB", "1TB"]
      }

    ]
  },
  {
    name: "Clothing",
    description: "Various types of clothing for men, women, and children.",
    image: "/images/clothing.png",
    attrs: [
      {
        key: "Size",
        value: ["XS", "S", "M", "L", "XL", "XXL"]
      },
      {
        key: "Color",
        value: ["Red", "Blue", "Green", "Black", "White"]
      },
      {
        key: "Material",
        value: ["Cotton", "Polyester", "Silk", "Denim"]
      }

    ]
  },
  {
    name: "Books",
    description: "A wide selection of books from various genres.",
    image: "/images/books.png",
    attrs: [
      {
        key: "Genre",
        value: ["Fiction", "Non-Fiction", "Science Fiction", "Mystery", "Romance"]
      },
      {
        key: "Author",
        value: ["J.K. Rowling", "Stephen King", "Agatha Christie", "George Orwell"]
      },
      {
        key: "Language",
        value: ["English", "Spanish", "French", "German"]
      }
    ]
  },
  {
    name: "Home & Kitchen",
    description: "Items for your home and kitchen.",
    image: "/images/home-kitchen.png",
    attrs: [
      {
        key: "Material",
        value: ["Stainless Steel", "Wood", "Plastic", "Glass"]
      },
      {
        key: "Type",
        value: ["Cookware", "Furniture", "Decor", "Appliances"]
      },
      {
        key: "Color",
        value: ["White", "Black", "Silver", "Brown"]
      }
    ]
  },
  {
    name: "Sports & Outdoors",
    description: "Equipment and accessories for sports and outdoor activities.",
    image: "/images/sports.png",
    attrs: [
      {
        key: "Type",
        value: ["Fitness", "Camping", "Cycling", "Swimming"]
      },
      {
        key: "Size",
        value: ["Small", "Medium", "Large"]
      },
      {
        key: "Material",
        value: ["Carbon Fiber", "Nylon", "Rubber"]
      }
    ]
  }
]

module.exports = categories