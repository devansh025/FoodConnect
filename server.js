// import express from "express";
// import admin from "firebase-admin";
// import cors from "cors";
// import dotenv from "dotenv";
// import fs from "fs";

// // Load environment variables
// dotenv.config();

// // Load Firebase service account credentials
// const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore(); // Firestore instance

// const app = express();
// app.use(express.json());
// app.use(cors());

// // CREATING API FOR CRUD OPERATIONS

// // CREATE (Add data)
// app.post("/add", async (req, res) => {
//     try {
//         const { collection, data } = req.body; // Get collection name and data from request
//         const docRef = await db.collection(collection).add(data);
//         res.json({ success: true, id: docRef.id }); // Return document ID
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // READ (Get data)
// app.get("/get/:collection", async (req, res) => {
//     try {
//         const snapshot = await db.collection(req.params.collection).get();
//         const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         res.json(docs); // Return all documents
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // UPDATE (Modify data)
// app.put("/update/:collection/:id", async (req, res) => {
//     try {
//         await db.collection(req.params.collection).doc(req.params.id).update(req.body);
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // DELETE (Remove data)
// app.delete("/delete/:collection/:id", async (req, res) => {
//     try {
//         await db.collection(req.params.collection).doc(req.params.id).delete();
//         res.json({ success: true });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));


// Use `import` instead of `require`
import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import dotenv from "dotenv";
import { readFileSync } from "fs";

// Load environment variables
dotenv.config();

// Read Firebase service account key (since `require()` isn't available)
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Firestore instance

const app = express();
app.use(express.json());
app.use(cors());

// CREATING API FOR CRUD OPERATIONS

// Create (Add data)
app.post("/add", async (req, res) => {
  try {
    const { collection, data } = req.body; // Get collection name and data from request
    const docRef = await db.collection(collection).add(data);
    res.json({ success: true, id: docRef.id }); // Return document ID
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Read (Get data)
app.get("/get/:collection", async (req, res) => {
  try {
    const snapshot = await db.collection(req.params.collection).get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(docs); // Return all documents
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update (Modify data)
app.put("/update/:collection/:id", async (req, res) => {
  try {
    await db.collection(req.params.collection).doc(req.params.id).update(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete (Remove data)
app.delete("/delete/:collection/:id", async (req, res) => {
  try {
    await db.collection(req.params.collection).doc(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
