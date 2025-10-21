import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

const COLLECTION_NAME = "loginAttempts"

// Add a new login attempt
export async function addAttempt(numberOfTries) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      numberOfTries: Number.parseInt(numberOfTries),
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      createdAt: serverTimestamp(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error adding attempt:", error)
    return { success: false, error: error.message }
  }
}

// Get all attempts
export async function getAllAttempts() {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const attempts = []
    querySnapshot.forEach((doc) => {
      attempts.push({ id: doc.id, ...doc.data() })
    })
    return attempts
  } catch (error) {
    console.error("Error getting attempts:", error)
    return []
  }
}

// Delete an attempt
export async function deleteAttempt(id) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
    return { success: true }
  } catch (error) {
    console.error("Error deleting attempt:", error)
    return { success: false, error: error.message }
  }
}
