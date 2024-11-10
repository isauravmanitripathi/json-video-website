'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim() || isSubmitting) return;

    const loadingToast = toast.loading('Creating project...');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName.trim() })
      });

      if (response.ok) {
        setNewProjectName('');
        await fetchProjects();
        toast.success('Project created successfully!', {
          id: loadingToast,
        });
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project', {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId, projectName) => {
    const loadingToast = toast.loading('Deleting project...');

    try {
      const response = await fetch(`/api/projects?id=${projectId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== projectId));
        toast.success(`Project "${projectName}" deleted`, {
          id: loadingToast,
        });
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project', {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="fade-in">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">
              Video Generator
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              Create and manage your video projects
            </p>
          </div>

          {/* Create Project Form */}
          <div className="fade-in stagger-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 hover-scale">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Project</h2>
              <form onSubmit={handleCreateProject} className="flex gap-4">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition-all text-gray-700 placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 
                           transition-all disabled:bg-blue-300 hover-scale"
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </button>
              </form>
            </div>
          </div>

          {/* Projects List */}
          <div className="fade-in stagger-2">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Projects</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-lg">
                No projects yet. Create your first project above!
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project, index) => (
                      <tr
                        key={project.id}
                        className="hover:bg-gray-50 slide-in group cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td 
                          className="px-6 py-4 whitespace-nowrap"
                          onClick={() => window.location.href = `/projects-file?id=${project.id}`}
                        >
                          <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {new Date(project.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project.id, project.name);
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors hover-scale inline-block px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}