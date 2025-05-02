const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;



async function generateHashedUsers (users) {
  const hashedUsers = await Promise.all(
    users.map(async(user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {...user, password: hashedPassword}
    })
  )
  return hashedUsers;
}

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    isAdmin: true,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "securePass456",
    isAdmin: false,
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "strongPassword789",
    isAdmin: false,
  },
    {
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    password: "anotherPass101",
    isAdmin: false,
  },
  {
    _id: new ObjectId("67ea87efb21fb451c4067b70"),
    firstName: "Eva",
    lastName: "Brown",
    email: "eva.brown@example.com",
    password: "safePassword202",
    isAdmin: true,
  },
];

const getHashedData = async () => {
  return await generateHashedUsers(users)
}


module.exports = getHashedData;