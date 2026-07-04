import { useEffect, useState } from 'react';
import { getContactMessages } from '../api';
import './Admin.css';

const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'chenxi2026';

export default function Admin() {
  const [unlocked, setUnlocked] = useState(
    sessionStorage.getItem('admin_unlocked') === '1'
  );
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState('');

  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!unlocked) return;
    getContactMessages()
      .then((data) => {
        setMessages(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [unlocked]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passInput === ADMIN_PASSCODE) {
      sessionStorage.setItem('admin_unlocked', '1');
      setUnlocked(true);
      setPassError('');
    } else {
      setPassError('密码不正确，请重试');
    }
  };

  if (!unlocked) {
    return (
      <div className="admin-lock">
        <form className="admin-lock-card" onSubmit={handleUnlock}>
          <p className="eyebrow">后台管理</p>
          <h1>请输入访问密码</h1>
          <p className="admin-lock-desc">
            这里展示的是客户留言，仅供内部查看，请输入密码继续。
          </p>
          <input
            type="password"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            placeholder="访问密码"
            autoFocus
          />
          {passError && <p className="form-feedback form-feedback-error">{passError}</p>}
          <button type="submit" className="btn btn-primary">
            进入
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">后台管理</p>
          <h1>客户留言</h1>
          <p className="page-hero-desc">
            这里汇总了所有通过「联系我们」页面提交的客户留言，按时间倒序排列。
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          {status === 'loading' && <p className="services-status">正在加载留言…</p>}
          {status === 'error' && (
            <p className="services-status services-status-error">
              暂时无法加载留言数据，请确认后端服务是否已启动。
            </p>
          )}
          {status === 'ready' && messages.length === 0 && (
            <p className="services-status">目前还没有客户留言。</p>
          )}

          {status === 'ready' && messages.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>公司</th>
                    <th>感兴趣的服务</th>
                    <th>留言内容</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id}>
                      <td>{formatDate(m.created_at)}</td>
                      <td>{m.name}</td>
                      <td>{m.email}</td>
                      <td>{m.company || '—'}</td>
                      <td>{m.service_interest || '—'}</td>
                      <td className="admin-table-message">{m.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function formatDate(isoLike) {
  // SQLite datetime('now') 返回 UTC 时间，如 "2026-07-04 08:30:00"
  const d = new Date(isoLike.replace(' ', 'T') + 'Z');
  if (Number.isNaN(d.getTime())) return isoLike;
  return d.toLocaleString('zh-CN', { hour12: false });
}
