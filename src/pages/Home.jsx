import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChatDemo from '../components/ChatDemo';
import { getServices } from '../api';
import './Home.css';

const STATS = [
  { value: '1,000+', label: '服务企业客户' },
  { value: '80%', label: '平均响应时间缩短' },
  { value: '7×24h', label: '不间断在线服务' },
  { value: '2021', label: '公司成立年份' },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => setError('暂时无法加载服务数据，请稍后再试。'));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">AI 客服 · 企业建站</p>
            <h1 className="hero-title">
              让每一次客户对话，
              <br />
              都像<span className="hero-highlight">阳光一样</span>温暖高效
            </h1>
            <p className="hero-desc">
              晨曦科技帮助企业用 AI 智能客服提升响应效率，用干净专业的官网建立品牌第一印象。
              从对话到页面，我们让服务这件事变得更简单。
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                预约免费演示
              </Link>
              <Link to="/services" className="btn btn-ghost">
                查看服务详情
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-blob" aria-hidden="true" />
            <ChatDemo />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">我们能帮到你</p>
            <h2>两项核心能力，撑起企业数字化第一步</h2>
          </div>

          {error && <p className="home-error">{error}</p>}

          <div className="service-grid">
            {services.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul>
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>准备好让服务更高效了吗？</h2>
            <p className="cta-desc">15 分钟了解 AI 客服如何为你的团队节省时间。</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            立即预约
          </Link>
        </div>
      </section>
    </div>
  );
}
