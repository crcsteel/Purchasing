// ===== CONFIG =====
const SHEET_ID = '1XTruQeRZh32zcAVfXVBgbrsmBOrgBfOa7v2FV-Ut2YY';
const SHEET_NAME = 'data'; // ชื่อแท็บใน Google Sheets
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

let sheetData = [];

// ===== ดึงข้อมูลจาก Google Sheets =====
async function fetchData() {
  try {
    const res = await fetch(API_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    // แปลงข้อมูลเป็น Array
    sheetData = json.table.rows.map(row => ({
      date: row.c[0]?.v || '',
      sales: parseFloat(row.c[1]?.v || 0),
      orders: parseInt(row.c[2]?.v || 0),
      customers: parseInt(row.c[3]?.v || 0)
    }));

    renderSummary(sheetData);
    renderTable(sheetData);
    renderChart(sheetData);

  } catch (err) {
    console.error('Error fetching data', err);
  }
}

// ===== แสดงข้อมูลในตาราง =====
function renderTable(data) {
  const tableElement = document.querySelector('#dataTable tbody');
  if (!tableElement) return; // ไม่มีตารางในหน้านี้

  tableElement.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-2 border">${row.date}</td>
      <td class="p-2 border text-right">${row.sales.toLocaleString()}</td>
      <td class="p-2 border text-right">${row.orders}</td>
      <td class="p-2 border text-right">${row.customers}</td>
    `;
    tableElement.appendChild(tr);
  });
}

// ===== อัปเดตการ์ดสรุป =====
function renderSummary(data) {
  const totalSales = data.reduce((sum, r) => sum + r.sales, 0);
  const totalOrders = data.reduce((sum, r) => sum + r.orders, 0);
  const totalCustomers = data.reduce((sum, r) => sum + r.customers, 0);

  // Dashboard cards
  if (document.getElementById('totalSales')) {
    document.getElementById('totalSales').textContent = totalSales.toLocaleString();
  }
  if (document.getElementById('totalOrders')) {
    document.getElementById('totalOrders').textContent = totalOrders.toLocaleString();
  }
  if (document.getElementById('totalCustomers')) {
    document.getElementById('totalCustomers').textContent = totalCustomers.toLocaleString();
  }

  // Report cards
  if (document.getElementById('reporttotalSales')) {
    document.getElementById('reporttotalSales').textContent = totalSales.toLocaleString();
  }
  if (document.getElementById('reporttotalOrders')) {
    document.getElementById('reporttotalOrders').textContent = totalOrders.toLocaleString();
  }
  if (document.getElementById('reporttotalCustomers')) {
    document.getElementById('reporttotalCustomers').textContent = totalCustomers.toLocaleString();
  }
}

// ===== แสดงกราฟ =====
function renderChart(data) {
  const chartElement = document.getElementById('salesChart');
  if (!chartElement) return; // ไม่มีกราฟในหน้านี้

  const ctx = chartElement.getContext('2d');

  // ลบกราฟเก่าถ้ามี
  if (window.salesChartInstance) {
    window.salesChartInstance.destroy();
  }

  window.salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(r => r.date),
      datasets: [{
        label: 'ยอดขาย',
        data: data.map(r => r.sales),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => value.toLocaleString()
          }
        }
      }
    }
  });
}

// ===== ค้นหาในตาราง =====
document.addEventListener('input', function (e) {
  if (e.target.id === 'searchInput') {
    const keyword = e.target.value.toLowerCase();
    const filtered = sheetData.filter(row =>
      row.date.toLowerCase().includes(keyword) ||
      row.sales.toString().includes(keyword) ||
      row.orders.toString().includes(keyword) ||
      row.customers.toString().includes(keyword)
    );
    renderTable(filtered);
  }
});

// ===== โหลดหน้าแบบ SPA =====
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('data-load')) {
    e.preventDefault();
    const page = e.target.getAttribute('href');
    fetch(page)
      .then(res => res.text())
      .then(html => {
        document.querySelector('main').innerHTML = html;
        // โหลดข้อมูลใหม่ถ้าหน้านั้นมีตาราง/การ์ด/กราฟ
        fetchData();
      });
  }
});

// ===== โหลดข้อมูลครั้งแรก =====
fetchData();
