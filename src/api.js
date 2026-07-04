const API_BASE = import.meta.env.VITE_API_BASE || 'https://chengxi-backend.onrender.com';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `请求失败 (${res.status})`);
  }
  return res.json();
}

export const getTeam = () => request('/api/team');
export const getMilestones = () => request('/api/milestones');
export const getServices = () => request('/api/services');
export const sendContact = (data) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(data) });
export const getContactMessages = () => request('/api/contact');
