// src/services/projectService.js
import db from '@/lib/db';

export const projectService = {
  getAllProjects() {
    return db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
  },

  createProject(name) {
    const result = db.prepare('INSERT INTO projects (name) VALUES (?)').run(name);
    return db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
  },

  deleteProject(id) {
    return db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  },

  getProjectById(id) {
    return db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  }
};

export default projectService;