import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [is_done, setStatus] = useState(false);

  // Fetch details
  useEffect(() => {
    fetchItems();
  }, []);

  //Get function
  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();
    setItems(data);
  };

  //Post function
  const addTitle = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, is_done }),
    });

    const newItems = await res.json();
    setItems([...items, newItems]);
    setTitle('');
    setStatus(false);
  };

  //Delete function
  const deleteUser = async (id) => {

    await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    });

    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>

        <label>*ADD NEW*</label>

        <form onSubmit={addTitle}>

          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <select
            value={is_done ? 'True' : 'False'}
            onChange={(e) => setStatus(e.target.value === 'True')}
            style={{ marginLeft: '1rem' }}>

            <option value="False">UNDONE</option>
            <option value="True">DONE</option>
          </select>

          <button type="submit" style={{ marginLeft: '1rem' }}>
            Add User
          </button>

        </form>
      

      <label>*ITEM LIST*</label>
      <table>
        <thead>
          <th>Title Name</th>
          <th>Status</th>
          <th>Timestamp</th>
          <th>Action</th>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                {item.title}
              </td>
              <td>
                {item.is_done ? 'DONE' : 'UNDONE'}
              </td>
              <td>
                {item.created_at}
              </td>
              <td>
                <button onClick={() => deleteUser(item.id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default App;
