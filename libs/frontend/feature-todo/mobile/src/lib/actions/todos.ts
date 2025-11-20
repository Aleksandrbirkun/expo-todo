import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import { mobileConfig } from '@shared/configs/lib/supabase';

export async function createTodo(formData: FormData) {
  console.log('=== MOBILE ACTION: CREATE TODO ===');

  const {
    data: { session },
  } = await mobileClient.auth.getSession();

  if (!session?.access_token) {
    console.log('No session for creating todo');
    return { error: 'Not authenticated' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  console.log('Creating todo:', { title, description });

  const requestBody = {
    title,
    description: description || null,
    completed: false,
  };

  console.log('API URL:', `${mobileConfig.api.url}/todos`);

  try {
    const response = await fetch(`${mobileConfig.api.url}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Create todo response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create todo failed:', errorText);
      return { error: `Failed to create todo: ${response.status}` };
    }

    const responseData = await response.json();
    console.log('Create todo success:', responseData);

    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error creating todo:', error);
    return { error: 'Failed to create todo' };
  }
}

export async function updateTodo(id: string, formData: FormData) {
  console.log('=== MOBILE ACTION: UPDATE TODO ===');
  console.log('Todo ID:', id);

  const {
    data: { session },
  } = await mobileClient.auth.getSession();

  if (!session?.access_token) {
    return { error: 'Not authenticated' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const completed = formData.get('completed') === 'on';

  console.log('Updating todo with:', { title, description, completed });

  try {
    const response = await fetch(`${mobileConfig.api.url}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        title,
        description: description || null,
        completed,
      }),
    });

    console.log('Update todo response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update todo failed:', errorText);
      return { error: `Failed to update todo: ${response.status}` };
    }

    const responseData = await response.json();
    console.log('Update todo success:', responseData);

    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error updating todo:', error);
    return { error: 'Failed to update todo' };
  }
}

export async function toggleTodo(id: string, completed: boolean) {
  console.log('=== MOBILE ACTION: TOGGLE TODO ===');
  console.log('Todo ID:', id, 'Completed:', completed);

  const {
    data: { session },
  } = await mobileClient.auth.getSession();

  if (!session?.access_token) {
    return { error: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${mobileConfig.api.url}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ completed }),
    });

    console.log('Toggle todo response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Toggle todo failed:', errorText);
      return { error: `Failed to toggle todo: ${response.status}` };
    }

    const responseData = await response.json();
    console.log('Toggle todo success:', responseData);

    return { success: true, data: responseData };
  } catch (error) {
    console.error('Error toggling todo:', error);
    return { error: 'Failed to toggle todo' };
  }
}

export async function deleteTodo(id: string) {
  console.log('=== MOBILE ACTION: DELETE TODO ===');
  console.log('Todo ID:', id);

  const {
    data: { session },
  } = await mobileClient.auth.getSession();

  if (!session?.access_token) {
    return { error: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${mobileConfig.api.url}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    console.log('Delete todo response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete todo failed:', errorText);
      return { error: `Failed to delete todo: ${response.status}` };
    }

    console.log('Delete todo success');

    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { error: 'Failed to delete todo' };
  }
}

export async function getTodos() {
  console.log('=== MOBILE ACTION: GET TODOS ===');

  const {
    data: { session },
  } = await mobileClient.auth.getSession();

  if (!session?.access_token) {
    console.log('No session for fetching todos');
    return { error: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${mobileConfig.api.url}/todos`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    console.log('Get todos response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get todos failed:', errorText);
      return { error: `Failed to fetch todos: ${response.status}` };
    }

    const data = await response.json();
    const todos = Array.isArray(data) ? data : [];

    console.log('Get todos success, count:', todos.length);

    return { success: true, data: todos };
  } catch (error) {
    console.error('Error fetching todos:', error);
    return { error: 'Failed to fetch todos', data: [] };
  }
}
