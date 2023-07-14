const express = require("express");
const nanoid = require("nanoid");

const app = express();
app.use(express.json());

// Menyimpan catatan dalam variabel
let notes = [];

// Menambahkan catatan baru
app.post("/notes", (req, res) => {
  const { judul, tags, body } = req.body;
  const id = nanoid();

  const note = { id, judul, tags, body };
  notes.push(note);
  res.json(note);
});

// Menampilkan semua catatan
app.get("/notes", (req, res) => {
  //res.json(notes);
  res.status(200).send("Status: OK");
});

// Mengubah catatan
app.put("/notes/:id", (req, res) => {
  const { judul, tags, body } = req.body;
  const { id } = req.params;

  const note = notes.find((note) => note.id === id);
  if (!note) {
    return res.status(404).json({ error: "Catatan tidak ditemukan" });
  }

  note.judul = judul;
  note.tags = tags;
  note.body = body;

  res.json(note);
});

// Menghapus catatan
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Catatan tidak ditemukan" });
  }

  const deletedNote = notes[index];
  notes.splice(index, 1);

  res.json({ message: "Catatan berhasil dihapus", deletedNote });
});

// Menjalankan server
app.listen(3000, () => {
  console.log("Server berjalan pada http://localhost:3000");
});
