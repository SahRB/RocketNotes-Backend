const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    try {
      // Verificar se o usuário existe
      const userExists = await knex('users').where({ id: user_id }).first();

      if (!userExists) {
        return response.status(404).json({ error: "User not found" });
      }

      // Inserir a nota
      const [note_id] = await knex("notes").insert({
        title,
        description,
        user_id
      });

      // Inserir links
      const linksInsert = links.map(link => ({
        note_id,
        url: link
      }));

      await knex("links").insert(linksInsert);

      // Inserir tags
      const tagsInsert = tags.map(name => ({
        note_id,
        name,
        user_id
      }));

      await knex("tags").insert(tagsInsert);

      return response.status(201).json({ message: "Note created successfully", note_id });
    } catch (error) {
      console.error("Error creating note:", error);
      return response.status(500).json({ error: "An error occurred while creating the note" });
    }
  }

  async show(request, response) {
    const { id } = request.params;

    try {
      const note = await knex("notes").where({ id }).first();
      const tags = await knex("tags").where({ note_id: id }).orderBy("name")
      const links = await knex("links").where({ note_id: id }).orderBy("created_at")

      if (!note) {
        return response.status(404).json({ error: "Note not found" });
      }

      return response.json({
        ...note,
        tags,
        links
      })
    } catch (error) {
      console.error("Error fetching note:", error);
      return response.status(500).json({ error: "An error occurred while fetching the note" });
    }
  }
  async delete(request, response) {
    const { id } = request.params

    await knex("notes").where({ id }).delete()

    return response.json()
  }
  async index(request, response) {
    const { title, user_id, tags } = request.query

    let notes

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title")
        
    } else {
      notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

    const userTags = await knex("tags").where({ user_id })
    const notesWhithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWhithTags)
  }
}

module.exports = NotesController;
