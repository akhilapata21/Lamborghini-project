import JSONDatabase from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  console.log("=== STARTING DATABASE DRIVER VERIFICATION ===");
  const testDbPath = path.join(__dirname, 'db', 'test_bookings.json');
  const db = new JSONDatabase(testDbPath);

  try {
    // 1. Clean test DB
    console.log("Ensuring file exists...");
    await db.ensureFile();

    // 2. Insert new test booking
    console.log("Inserting record: 'Bruce Wayne'...");
    const b1 = await db.insert({
      name: "Bruce Wayne",
      email: "bruce@waynecorp.com",
      model: "Revuelto",
      tag: "Flagship HPEV"
    });
    console.log("SUCCESS. Created record ID:", b1.id);
    if (!b1.id.startsWith("LMB-")) throw new Error("ID should start with LMB-");

    // 3. Retrieve all records
    console.log("Reading all records...");
    const records = await db.getAll();
    console.log("SUCCESS. Found", records.length, "record(s).");
    if (records.length !== 1) throw new Error("Record count should be 1");

    // 4. Update status
    console.log("Updating status to 'Confirmed'...");
    const updated = await db.update(b1.id, { status: "Confirmed" });
    console.log("SUCCESS. Updated status is:", updated.status);
    if (updated.status !== "Confirmed") throw new Error("Status was not updated");

    // 5. Delete record
    console.log("Deleting record...");
    const deleted = await db.delete(b1.id);
    console.log("SUCCESS. Deleted status:", deleted);
    if (!deleted) throw new Error("Delete operation returned false");

    // 6. Check clean state
    const finalRecords = await db.getAll();
    console.log("Final records count:", finalRecords.length);
    if (finalRecords.length !== 0) throw new Error("Record count should be 0");

    console.log("\n=== ALL DATABASE DRIVER TESTS COMPLETED SUCCESSFULLY ===");
  } catch (e) {
    console.error("TEST FAILURE:", e);
    process.exit(1);
  }
}

runTest();
