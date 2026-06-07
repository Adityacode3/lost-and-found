// =============================================
// SAMPLE DATA — paste into MongoDB Compass or run via mongosh
// Collection: users
// =============================================

// NOTE: Passwords below are bcrypt hashed — both are "password123"
db.users.insertMany([
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lihO",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rohan Mehta",
    email: "rohan@example.com",
    password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lihO",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// =============================================
// Collection: items (replace userId with actual ObjectId after inserting users)
// =============================================
db.items.insertMany([
  {
    itemName: "Blue Backpack",
    description: "Dark blue Wildcraft backpack with a laptop compartment and red zipper. Has a keychain of a small owl attached.",
    location: "Connaught Place Metro Station, Delhi",
    contactNumber: "+91 98765 43210",
    image: null,
    status: "Lost",
    userName: "Priya Sharma",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemName: "iPhone 13 Pro",
    description: "Space gray iPhone 13 Pro with a cracked back cover. Has a blue case on it. Lock screen has a photo of mountains.",
    location: "Lajpat Nagar Market, Delhi",
    contactNumber: "+91 91234 56789",
    image: null,
    status: "Lost",
    userName: "Rohan Mehta",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemName: "Black Leather Wallet",
    description: "Small black leather bifold wallet. Contains some cash and ID cards. Brand appears to be Tommy Hilfiger.",
    location: "Saket Mall Food Court, Delhi",
    contactNumber: "+91 87654 32109",
    image: null,
    status: "Found",
    userName: "Priya Sharma",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemName: "Car Keys",
    description: "Honda City car keys with a remote keychain. Has a small football keyring attached to it.",
    location: "Nehru Place Bus Stop, Delhi",
    contactNumber: "+91 99887 76655",
    image: null,
    status: "Found",
    userName: "Rohan Mehta",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    itemName: "Reading Glasses",
    description: "Black-framed rectangular reading glasses in a brown leather case. Power: -2.5",
    location: "Khan Market, New Delhi",
    contactNumber: "+91 98112 23344",
    image: null,
    status: "Lost",
    userName: "Priya Sharma",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
