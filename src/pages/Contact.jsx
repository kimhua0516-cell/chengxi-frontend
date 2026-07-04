import { useState } from 'react';
import { sendContact } from '../api';
import './Contact.css';

const initialForm = {
  name: '',
  email: '',
  company: '',
  service_interest: 'AI 智能客服',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await sendContact(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || '提交失败，请稍后再试');
    }
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">联系我们</p>
          <h1>告诉我们你的需求，我们会尽快联系你</h1>
          <p className="page-hero-desc">
            无论是想了解 AI 客服，还是想为公司做一个新官网，留下信息，我们通常会在一个工作日内回复。
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                姓名 *
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="你的名字"
                />
              </label>
              <label>
                邮箱 *
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                公司名称
                <input
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  placeholder="你的公司"
                />
              </label>
              <label>
                感兴趣的服务
                <select value={form.service_interest} onChange={update('service_interest')}>
                  <option>AI 智能客服</option>
                  <option>企业官网建设</option>
                  <option>数字化咨询</option>
                  <option>其他</option>
                </select>
              </label>
            </div>

            <label>
              留言 *
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="简单描述一下你的需求…"
              />
            </label>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? '提交中…' : '发送留言'}
            </button>

            {status === 'success' && (
              <p className="form-feedback form-feedback-success">
                已收到你的留言，我们会尽快与你联系 🎉
              </p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback-error">{errorMsg}</p>
            )}
          </form>

          <div className="contact-info">
            <div className="contact-info-card">
              <h3>直接联系</h3>
              <p>📧 hello@chenxi-tech.com</p>
              <p>📞 +86 400-800-1234</p>
              <p>📍 上海市 · 徐汇区</p>
            </div>
            <div className="contact-info-card contact-info-highlight">
              <h3>快速预约演示</h3>
              <p>想直接看看 AI 客服怎么用？告诉我们方便的时间，我们安排 15 分钟线上演示。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
