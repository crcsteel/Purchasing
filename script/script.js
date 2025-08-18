const SHEET_ID = '1XTruQeRZh32zcAVfXVBgbrsmBOrgBfOa7v2FV-Ut2YY';
const SHEET_NAME = 'salesdaily';
const API_URL_DATA = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}&tqx=out:json`;
const API_URL_TARGET = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tq=select I limit 4 offset 0&sheet=${SHEET_NAME}&tqx=out:json`;
const API_URL_INVENTORY = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=inventory&tqx=out:json`;
const API_URL_PRODUCT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=product-prices&tqx=out:json`;
const API_URL_INVENTORY_OUT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=inventory-out&tqx=out:json`;      // ชื่อชีต
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tq=select V,W,X,Y limit 3 offset 0&sheet=inventory&tqx=out:json`;
const API_URL_BASEPRICE = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=baseprice&tqx=out:json`;
const API_URL_BASEPRICE_INVENTORY = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tq=select A,B,C,D limit 10 offset 0&sheet=baseprice&tqx=out:json`;


// ---- Global Apex Style ----
Apex.chart = { fontFamily: "'K2D', sans-serif" };
Apex.dataLabels = { style: { fontSize: '10px', fontFamily: "'K2D', sans-serif" } };
Apex.legend = { fontSize: '14px', fontFamily: "'K2D', sans-serif" };
Apex.xaxis = { labels: { style: { fontSize: '12px', fontFamily: "'K2D', sans-serif" } } };
Apex.yaxis = { labels: { style: { fontSize: '12px', fontFamily: "'K2D', sans-serif" } } };


// ---- Helper Functions ----
function formatNumber(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatDateDDMMYY(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}
function toNumber(val) {
  return parseFloat(val) || 0;
}









