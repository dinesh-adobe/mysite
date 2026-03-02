export default async function decorate(block) {
  const DATA_URL = 'https://main--mysite--dinesh-adobe.aem.page/data.json';

  try {
    const response = await fetch(DATA_URL, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const json = await response.json();

    if (!json.data || !json.data.length) {
      block.innerHTML = '<p>No data available</p>';
      return;
    }

    const rows = json.data;

    // Create table
    const table = document.createElement('table');
    table.classList.add('dynamic-table');

    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    Object.keys(rows[0]).forEach((key) => {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');

    rows.forEach((row) => {
      const tr = document.createElement('tr');

      Object.values(row).forEach((value) => {
        const td = document.createElement('td');
        td.textContent = value ?? '';
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    block.innerHTML = '';
    block.appendChild(table);

  } catch (error) {
    console.error('Table fetch failed:', error);
    block.innerHTML = '<p>Failed to load data</p>';
  }
}